

const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const registerUser = async (req, res) => {
  try {
    const {
      name, age, dob, gender, fatherName, motherName, grandmotherName,
      address, phone, job, marriageStatus, spouseName, temAddress,
      subgroup, userName, password, childrenName, childrenAge, childrenGender
    } = req.body;

    console.log('User details:', name, age, dob, gender, fatherName, motherName, grandmotherName,
      address, phone, job, marriageStatus, spouseName, temAddress,
      subgroup, userName, password, childrenName, childrenAge, childrenGender);


    if (!userName) {
      return res.status(400).json({ error: 'Email is required', message: 'Email is required' });
    }


    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists', message: 'User with this email already exists' });
    }
    let childrenDetails;
    if (marriageStatus === 'yes' && childrenName) {
      const childrenNameArray = Array.isArray(childrenName) ? childrenName : [childrenName];
      const childrenAgeArray = Array.isArray(childrenAge) ? childrenAge : [childrenAge];
      const childrenGenderArray = Array.isArray(childrenGender) ? childrenGender : [childrenGender];

      childrenDetails = childrenNameArray.map((name, index) => ({
        name,
        age: childrenAgeArray[index],
        gender: childrenGenderArray[index]
      }));
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      age,
      dob,
      gender,
      fatherName,
      motherName,
      grandmotherName,
      photo: req.file.filename,
      address,
      temAddress,
      phone,
      job,
      marriageStatus,
      spouseName: marriageStatus === 'yes' ? spouseName : undefined,
      children: childrenDetails,
      subgroup,
      userName,
      password: hashedPassword,
    });
    console.log('user', user);

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
};


const calculateTotalMembers = async (users) => {
  let totalMembersCount = 0;

  users.forEach(user => {
    let count = 0;


    if (user.fatherName) count += 1;
    if (user.motherName) count += 1;
    if (user.grandmotherName) count += 1;
    if (user.spouseName) count += 1;


    if (user.children && Array.isArray(user.children)) {
      count += user.children.length;
    }
    totalMembersCount += count;
  });

  return totalMembersCount;
};

let mainUserDatas;
const getUsers = async (req, res) => {
  try {
    const { page = 1, perpageitems = 10, searchTerm, ageFilter, sortBy, subgroup, searchGrandMother } = req.query;
    const filter = {};
    const sort = {};

    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    if (searchGrandMother) {
      filter.$or = [
        { grandmotherName: { $regex: searchGrandMother, $options: 'i' } }
      ];
    }

    if (ageFilter) {
      filter.age = ageFilter;
    }

    if (subgroup) {
      filter.subgroup = subgroup;
    }

    if (sortBy === 'male') filter.gender = 'male';
    if (sortBy === 'female') filter.gender = 'female';
    if (sortBy === 'yes') filter.marriageStatus = 'yes';
    if (sortBy === 'no') filter.marriageStatus = 'no';

    const users = await User.find(filter)
      .skip((page - 1) * perpageitems)
      .limit(Number(perpageitems));
    const usersFullDetails = await User.find(filter)

    mainUserDatas = usersFullDetails;
    const total = await User.countDocuments(filter);

    // let totalMembersCount = 0;

    // mainUserDatas.forEach(user => {
    //   let count = 0;


    //   if (user.name) count += 1;
    //   if (user.fatherName) count += 1;
    //   if (user.motherName) count += 1;
    //   if (user.grandmotherName) count += 1;
    //   if (user.spouseName) count += 1;


    //   if (user.children && Array.isArray(user.children)) {
    //     count += user.children.length;
    //   }
    //   totalMembersCount += count;
    // });
    // const total = totalMembersCount;    

    res.json({ users, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};



const downloadUsersExcel = async (req, res) => {
  try {
    let users;

    if (mainUserDatas) {
      users = mainUserDatas;
    } else {
      users = await User.find({});
    }


    const userData = users.map(user => ({
      Name: user.name,
      Age: user.age,
      dob: new Date(user.dob).toISOString().split('T')[0],
      Gender: user.gender,
      FatherName: user.fatherName,
      MotherName: user.motherName,
      GrandmotherName: user.grandmotherName,
      Subgroup: user.subgroup,
      Job: user.job,
      Address: user.address,
      TemAddress: user.temAddress,
      Phone: user.phone,
      UserName: user.userName,
      MarriageStatus: user.marriageStatus,
      SpouseName: user.spouseName,
    }));


    let childrenData = [];

    users.forEach(user => {
      user.children.forEach(child => {
        childrenData.push({
          ParentName: user.name,
          ChildrenName: child.name,
          ChildrenAge: child.age,
          ChildrenGender: child.gender,
        });
      });
    });


    const wb = XLSX.utils.book_new();


    const userSheet = XLSX.utils.json_to_sheet(userData);
    XLSX.utils.book_append_sheet(wb, userSheet, 'Users');


    const childrenSheet = XLSX.utils.json_to_sheet(childrenData);
    XLSX.utils.book_append_sheet(wb, childrenSheet, 'Children');


    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });


    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');


    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating Excel file' });
  }
};

async function fetchImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

// const downloadUserPDF = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const doc = new PDFDocument();
//     const filename = `user_${userId}.pdf`;

//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
//     res.setHeader('Content-Type', 'application/pdf');

//     doc.pipe(res);
//     const photoUrl = `${process.env.UPLOAD_DIR}/${user.photo}`;

//     const startY = 100;
//     const startX = (doc.page.width / 2) - 75; 


//     if (user.photo) {
//       try {
//         const imageBuffer = await fetchImage(photoUrl);
//         doc.image(imageBuffer, startX, startY, { width: 150, height: 150 });
//       } catch (err) {
//         doc.text('Unable to load photo', { align: 'center' });
//       }
//     } else {
//       doc.text('No Photo Provided', { align: 'center' });
//     }

//     const textStartY = startY + 180;
//     doc.fontSize(25).text('User Details', { align: 'center', y: textStartY });
//     doc.fontSize(15);
//     let currentY = textStartY + 40;

//     const date = new Date(user.dob)
//     const formattedDate1 = date.toISOString().split('T')[0];

//     const userDetails = [
//       `Name: ${user.name}`,
//       `Age: ${user.age}`,
//       `Gender: ${user.gender}`,
//       `DOB: ${formattedDate1}`,
//       `Father: ${user.fatherName}`,
//       `Mother: ${user.motherName}`,
//       `Grand Mother: ${user.grandmotherName}`,
//       `Subgroup: ${user.subgroup}`,
//       `Job: ${user.job}`,
//       `Phone: ${user.phone}`,
//       `Address: ${user.address}`,
//       `Temp Address: ${user.temAddress}`,
//       `User Name: ${user.userName}`,
//       `Marriage Status: ${user.marriageStatus}`
//     ];

//     userDetails.forEach(detail => {
//       if (currentY + 20 > doc.page.height - doc.page.margins.bottom) {
//         doc.addPage(); 
//         currentY = 40; 
//       }
//       doc.text(detail, 50, currentY);
//       currentY += 20; 
//     });

//     if (user.spouseName) {
//       if (currentY + 20 > doc.page.height - doc.page.margins.bottom) {
//         doc.addPage();
//         currentY = 40;
//       }
//       doc.text(`Spouse Name: ${user.spouseName}`, 50, currentY);
//       currentY += 20;
//     }


//     if (user.children && user.children.length > 0) {
//       if (currentY + 20 > doc.page.height - doc.page.margins.bottom) {
//         doc.addPage();
//         currentY = 40;
//       }
//       doc.text('Children Details:', 50, currentY);
//       currentY += 20;

//       user.children.forEach((child, index) => {
//         if (currentY + 40 > doc.page.height - doc.page.margins.bottom) {
//           doc.addPage();
//           currentY = 40;
//         }
//         doc.text(`Child ${index + 1}:`, 50, currentY);
//         currentY += 20;
//         doc.text(`  Name: ${child.name}`, 70, currentY);
//         currentY += 20;
//         doc.text(`  Age: ${child.age}`, 70, currentY);
//         currentY += 20;
//         doc.text(`  Gender: ${child.gender}`, 70, currentY);
//         currentY += 30; 
//       });
//     }

//     doc.end();

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error generating PDF' });
//   }
// };

const downloadUserPDF = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const doc = new PDFDocument();
    const filename = `user_${userId}.pdf`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    const photoUrl = `${process.env.UPLOAD_DIR}/${user.photo}`;
    const startY = 100;
    const startX = (doc.page.width / 2) - 75;

    if (user.photo) {
      try {
        const imageBuffer = await fetchImage(photoUrl);
        doc.image(imageBuffer, startX, startY, { width: 150, height: 150 });
      } catch (err) {
        doc.text('Unable to load photo', { align: 'center' });
      }
    } else {
      doc.text('No Photo Provided', { align: 'center' });
    }

    let currentY = startY + 180;
    doc.fontSize(25).text('User Details', { align: 'center', y: currentY });
    doc.fontSize(15);
    currentY += 40;

    const formattedDate = new Date(user.dob).toISOString().split('T')[0];
    const userDetails = [
      `Name: ${user.name}`,
      `Age: ${user.age}`,
      `Gender: ${user.gender}`,
      `DOB: ${formattedDate}`,
      `Phone: ${user.phone}`,
      `Father: ${user.fatherName}`,
      `Mother: ${user.motherName}`,
      `Grand Mother: ${user.grandmotherName}`,
      `Subgroup: ${user.subgroup}`,
      `Job: ${user.job}`,
      `User Name: ${user.userName}`,
      `Marriage Status: ${user.marriageStatus}`
    ];
    const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    userDetails.forEach(detail => {
      const textHeight = doc.heightOfString(detail, { width: contentWidth });
      if (currentY + textHeight > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        currentY = 40;
      }
      doc.text(detail, doc.page.margins.left, currentY, { width: contentWidth });
      currentY += textHeight + 10;
    });

    const longFields = [
      { label: 'Address', value: user.address },
      { label: 'Temp Address', value: user.temAddress },
    ];

    longFields.forEach(field => {
      if (field.value) {
        const fieldHeight = doc.heightOfString(`${field.label}: ${field.value}`, { width: contentWidth });
        if (currentY + fieldHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          currentY = 40;
        }
        doc.text(`${field.label}: ${field.value}`, doc.page.margins.left, currentY, { width: contentWidth });
        currentY += fieldHeight + 10;
      }
    });

    if (user.spouseName) {
      const spouseText = `Spouse Name: ${user.spouseName}`;
      const spouseHeight = doc.heightOfString(spouseText, { width: contentWidth });
      if (currentY + spouseHeight > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        currentY = 40;
      }
      doc.text(spouseText, doc.page.margins.left, currentY, { width: contentWidth });
      currentY += spouseHeight + 10;
    }

    if (user.children && user.children.length > 0) {
      if (currentY + 20 > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        currentY = 40;
      }
      doc.text('Children Details:', doc.page.margins.left, currentY);
      currentY += 20;

      user.children.forEach((child, index) => {
        const childDetails = [
          `Child ${index + 1}:`,
          `  Name: ${child.name}`,
          `  Age: ${child.age}`,
          `  Gender: ${child.gender}`,
        ];

        childDetails.forEach(detail => {
          const childDetailHeight = doc.heightOfString(detail, { width: contentWidth });
          if (currentY + childDetailHeight > doc.page.height - doc.page.margins.bottom) {
            doc.addPage();
            currentY = 40;
          }
          doc.text(detail, doc.page.margins.left + 20, currentY, { width: contentWidth });
          currentY += childDetailHeight + 5;
        });
      });
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
};


const generateUserPDF = async (user, outputPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const outputFile = fs.createWriteStream(outputPath);
      doc.pipe(outputFile);

      const startY = 100;
      const startX = (doc.page.width / 2) - 75;


      if (user.photo) {
        try {
          const photoUrl = path.join(process.env.UPLOAD_DIR, user.photo);
          const imageBuffer = await fetchImage(photoUrl);
          doc.image(imageBuffer, startX, startY, { width: 150, height: 150 });
        } catch (err) {
          doc.text('Unable to load photo', { align: 'center' });
        }
      } else {
        doc.text('No Photo Provided', { align: 'center' });
      }

      const textStartY = startY + 180;
      let currentY = textStartY;


      doc.fontSize(25).text('User Details', { align: 'center', y: textStartY });
      doc.fontSize(15);

      const formattedDate = new Date(user.dob).toISOString().split('T')[0];
      const userDetails = [
        `Name: ${user.name}`,
        `Age: ${user.age}`,
        `Gender: ${user.gender}`,
        `DOB: ${formattedDate}`,
        `Phone: ${user.phone}`,
        `Father: ${user.fatherName}`,
        `Mother: ${user.motherName}`,
        `Grand Mother: ${user.grandmotherName}`,
        `Subgroup: ${user.subgroup}`,
        `Job: ${user.job}`,
        `User Name: ${user.userName}`,
        `Marriage Status: ${user.marriageStatus}`
      ];
      const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

      userDetails.forEach(detail => {
        const textHeight = doc.heightOfString(detail, { width: contentWidth });
        if (currentY + textHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          currentY = 40;
        }
        doc.text(detail, doc.page.margins.left, currentY, { width: contentWidth });
        currentY += textHeight + 10;
      });

      const longFields = [
        { label: 'Address', value: user.address },
        { label: 'Temp Address', value: user.temAddress },
      ];

      longFields.forEach(field => {
        if (field.value) {
          const fieldHeight = doc.heightOfString(`${field.label}: ${field.value}`, { width: contentWidth });
          if (currentY + fieldHeight > doc.page.height - doc.page.margins.bottom) {
            doc.addPage();
            currentY = 40;
          }
          doc.text(`${field.label}: ${field.value}`, doc.page.margins.left, currentY, { width: contentWidth });
          currentY += fieldHeight + 10;
        }
      });

      if (user.spouseName) {
        const spouseText = `Spouse Name: ${user.spouseName}`;
        const spouseHeight = doc.heightOfString(spouseText, { width: contentWidth });
        if (currentY + spouseHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          currentY = 40;
        }
        doc.text(spouseText, doc.page.margins.left, currentY, { width: contentWidth });
        currentY += spouseHeight + 10;
      }

      if (user.children && user.children.length > 0) {
        if (currentY + 20 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          currentY = 40;
        }
        doc.text('Children Details:', doc.page.margins.left, currentY);
        currentY += 20;

        user.children.forEach((child, index) => {
          const childDetails = [
            `Child ${index + 1}:`,
            `  Name: ${child.name}`,
            `  Age: ${child.age}`,
            `  Gender: ${child.gender}`,
          ];

          childDetails.forEach(detail => {
            const childDetailHeight = doc.heightOfString(detail, { width: contentWidth });
            if (currentY + childDetailHeight > doc.page.height - doc.page.margins.bottom) {
              doc.addPage();
              currentY = 40;
            }
            doc.text(detail, doc.page.margins.left + 20, currentY, { width: contentWidth });
            currentY += childDetailHeight + 5;
          });
        });
      }

      doc.end();

      outputFile.on('finish', () => {
        resolve(outputPath);
      });

      outputFile.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};

const downloadAllUserPDFs = async (req, res) => {
  try {
    let users;

    if (mainUserDatas) {
      users = mainUserDatas;
    } else {
      users = await User.find({});
    }
    if (!users.length) {
      return res.status(404).json({ error: 'No users found' });
    }

    const pdfFolder = path.join(__dirname, 'pdfs');

    if (!fs.existsSync(pdfFolder)) {
      fs.mkdirSync(pdfFolder);
    }

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=all_users_pdfs.zip');

    archive.pipe(res);

    for (const user of users) {
      const filename = `user_${user._id}.pdf`;
      const outputPath = path.join(pdfFolder, filename);

      await generateUserPDF(user, outputPath);

      archive.file(outputPath, { name: filename });
    }

    archive.finalize();

  } catch (error) {
    console.error('Error generating PDFs:', error);
    res.status(500).json({ error: 'Error generating PDFs' });
  }
};

// const updateUserDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     if (req.file) {
//       updates.photo = req.file.filename;
//     }
//     if (typeof updates.children === 'string') {
//       try {
//         updates.children = JSON.parse(updates.children);
//       } catch (error) {
//         return res.status(400).json({ error: 'Invalid children data format' });
//       }
//     }
//     const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update user details' });
//   }  
// };
const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.photo = req.file.filename;
    }
    console.log('updates.password', updates.pass);

    if (updates.pass !='undefined') {
      console.log('keri');
      
      updates.password = await bcrypt.hash(updates.pass, 10);
    }

    if (updates.children && typeof updates.children === 'string') {
      try {
        updates.children = JSON.parse(updates.children);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid children data format' });
      }
    }

    if (updates.children && !Array.isArray(updates.children)) {
      return res.status(400).json({ error: 'Children must be an array' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user details' });
  }
};


module.exports = { registerUser, getUsers, downloadUsersExcel, downloadUserPDF, downloadAllUserPDFs, updateUserDetails };


