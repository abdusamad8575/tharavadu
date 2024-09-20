

const User = require('../models/user');
const bcrypt = require('bcrypt');

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
      return res.status(400).json({ error: 'Email is required' });
    }

 
    const existingUser = await User.findOne({ userName });
    console.log('existingUser:-',existingUser);
    
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const childrenNameArray = Array.isArray(childrenName) ? childrenName : [childrenName];
    const childrenAgeArray = Array.isArray(childrenAge) ? childrenAge : [childrenAge];
    const childrenGenderArray = Array.isArray(childrenGender) ? childrenGender : [childrenGender];

    const childrenDetails = childrenNameArray.map((name, index) => ({
      name,
      age: childrenAgeArray[index],
      gender: childrenGenderArray[index]
    }));

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
      children: childrenDetails.length ? childrenDetails : undefined,
      subgroup,
      userName,
      password: hashedPassword,
    });
console.log('user',user);

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

module.exports = { registerUser };


// const User = require('../models/user');
// const bcrypt = require('bcrypt');

// const registerUser = async (req, res) => {
//   try {
//     const {
//       name, age, dob, gender, fatherName, motherName,grandmotherName,
//       address, phone, job, marriageStatus, spouseName,temAddress,
//        subgroup, mail, password,childrenName,childrenAge,childrenGender
//     } = req.body;
//     console.log('details',name, age, dob, gender, fatherName, motherName,grandmotherName,
//       address, phone, job, marriageStatus, spouseName,temAddress,
//        subgroup, mail, password,childrenName,childrenAge,childrenGender);
    
//     const childrenNameArray = Array.isArray(childrenName) ? childrenName : [childrenName];
    
//     const childrenAgeArray = Array.isArray(childrenAge) ? childrenAge : [childrenAge];
//     const childrenGenderArray = Array.isArray(childrenGender) ? childrenGender : [childrenGender];
//     const childsInside = childrenNameArray.map((name, index) => ({
//       name,
//       age: childrenAgeArray[index],
//       gender: childrenGenderArray[index]
//     }));  
//     const childsValue = childsInside[0]?.name ? childsInside : undefined;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       age,
//       dob,
//       gender,
//       fatherName,
//       motherName,
//       photo: req.file.filename,
//       address,
//       phone,
//       job,
//       grandmotherName,
//       marriageStatus,
//       temAddress,
//       spouseName: marriageStatus === 'yes' ? spouseName : undefined,
//       children: childsValue,
//       subgroup,
//       mail,
//       password: hashedPassword,
//     });

//     await user.save();    
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// };

// module.exports = { registerUser };
