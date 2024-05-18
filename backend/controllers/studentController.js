const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const { Student, Hostel, User } = require('../models');
const bcrypt = require('bcryptjs');
const Parser = require('json2csv').Parser;

const registerStudent = async (req, res) => {
    // console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({success, errors: errors.array() });
    }

    const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel, password } = req.body;
    try {
        let student = await Student.findOne({ cms_id });

        if (student) {
            return res.status(400).json({success, errors: [{ msg: 'Student already exists' }] });
        }
        let shostel = await Hostel.findOne({ name: hostel });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
            email,
            password: hashedPassword,
            isAdmin: false
        });

        await user.save();
        
        student = new Student({
            name,
            cms_id,
            room_no,
            batch,
            dept,
            course,
            email,
            father_name,
            contact,
            address,
            dob,
            cnic,
            user: user.id,
            hostel: shostel.id
        });
        

        await student.save();

        success = true;
        res.json({success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: 'Server error'});
    }
}

const getStudent = async (req, res) => {
    try {
        // console.log(req.body);
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({success, errors: errors.array() });
        }

        const { isAdmin } = req.body;

        if (isAdmin) {
            return res.status(400).json({success, errors:  'Admin cannot access this route' });
        }

        const { token } = req.body;
        
        const decoded = verifyToken(token);

        const student = await Student.findOne({user: decoded.userId}).select('-password');
        
        if (!student) {
            return res.status(400).json({success, errors: 'Student does not exist' });
        }

        success = true;
        res.json({success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: 'Server error'});
    }
}

const getAllStudents = async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({success, errors: errors.array() });
    }

    let { hostel } = req.body;

    try {

        const shostel = await Hostel.findById(hostel);

        const students = await Student.find({ hostel: shostel.id }).select('-password');

        success = true;
        res.json({success, students});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const updateStudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { id } = req.body; // Assuming the student ID is passed in the body
        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ success, errors: [{ msg: 'Student not found' }] });
        }

        const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel } = req.body;

        // If the hostel is passed as a name, find the hostel by name
        let shostel = hostel;
        if (typeof hostel === 'string') {
            shostel = await Hostel.findOne({ name: hostel });
            if (!shostel) {
                return res.status(404).json({ success, errors: [{ msg: 'Hostel not found' }] });
            }
        }

        student.name = name || student.name;
        student.cms_id = cms_id || student.cms_id;
        student.room_no = room_no || student.room_no;
        student.batch = batch || student.batch;
        student.dept = dept || student.dept;
        student.course = course || student.course;
        student.email = email || student.email;
        student.father_name = father_name || student.father_name;
        student.contact = contact || student.contact;
        student.address = address || student.address;
        student.dob = dob || student.dob;
        student.cnic = cnic || student.cnic;
        student.hostel = shostel.id || student.hostel;

        await student.save();

        success = true;
        res.json({ success, student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
};


const deleteStudent = async (req, res) => {
    try {
        // console.log(req.body);
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({success, errors: errors.array() });
        }

        const { id } = req.body;

        const student = await Student.findById(id).select('-password');

        if (!student) {
            return res.status(400).json({success, errors: [{ msg: 'Student does not exist' }] });
        }

        const user = await User.findByIdAndDelete(student.user);

        await Student.deleteOne(student);

        success = true;
        res.json({success, msg: 'Student deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const csvStudent = async (req, res) => {
    let success = false;
    try {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({success, errors: errors.array() });
        }

        const { hostel } = req.body;

        const shostel = await Hostel.findById(hostel);

        const students = await Student.find({ hostel: shostel.id }).select('-password');

        students.forEach(student => {
            student.hostel_name = shostel.name;
            student.d_o_b = new Date(student.dob).toDateString().slice(4);
            student.cnic_no = student.cnic.slice(0, 5) + '-' + student.cnic.slice(5, 12) + '-' + student.cnic.slice(12);
            student.contact_no = "+92 "+student.contact.slice(1);
        });

        const fields = ['name', 'cms_id', 'room_no', 'batch', 'dept', 'course', 'email', 'father_name', 'contact_no', 'address', 'd_o_b', 'cnic_no', 'hostel_name'];

        const opts = { fields };

        const parser = new Parser(opts);

        const csv = parser.parse(students);

        success = true;
        res.json({success, csv});
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

module.exports = {
    registerStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    csvStudent
}