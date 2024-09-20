const Category = require('../models/category')
const fs = require('fs');

const getCategory = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};
// const getClientCategory = async (req, res) => {
//   try {
//     const data = await Category.find({isAvailable:true}).sort({ createdAt: -1 });
//     res.status(200).json({ data })
//   } catch (error) {
//     console.log(error);
//   }
// };
const getEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const events = await Category.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalEvents = await Category.countDocuments();
    // console.log("events-12-",events,totalEvents);
    
    res.status(200).json({ events, totalPages: Math.ceil(totalEvents / limit), currentPage: parseInt(page) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getLatestEvents = async (req, res) => {
  try {
    const latestEvents = await Category.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({ data: latestEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).json({ data, message: 'Event found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const addCategory = async (req, res) => {
  console.log('reached Events')

  const { name, desc, date, place } = req?.body
  const image = req?.file?.filename
  try {

    const cat = new Category({ name, desc, image, date, place })
    await cat.save()

    return res.status(200).json({ data: cat, message: 'Events created successfully' });

  } catch (error) {
    console.log(error);
  }
}
const updateCategory = async (req, res) => {
  const { _id, name, desc, isAvailable, date, place } = req?.body
  const image = req?.file?.filename
  try {
    const data = await Category.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (image) {
      fs.unlink(`public/uploads/${data?.image}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }
    await Category.updateOne({ _id }, {
      $set: { name, desc, date, place, isAvailable, ...(image && { image }) }
    })
    res.status(200).json({ data, message: 'Event updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // fs.unlink(`public/uploads/${data?.image}`, (err) => {
    //   if (err) {
    //     console.error('Error deleting image:', err);
    //     return;
    //   }
    //   console.log('Image deleted successfully.');
    // });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

module.exports = {
  getCategory,
  // getClientCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getEvents,
  getLatestEvents,
}