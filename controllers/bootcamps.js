const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        })
    } catch (error) {
        next(err)
    }
}

// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Private
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        next(error)
        // res.status(400).json({
        //     success: false,
        //     message: "something went wrong"
        // })
    }
    // res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}`})
}

// @desc Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
        success: true,
        data: bootcamp
    })
    } catch (error) {
        next(err)
    }
    
}

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(200).json({ success: true, data: bootcamp})
    } catch (error) {
        next(err)
    }
    
}

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if (!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(200).json({ success: true, data: bootcamp.id})
    } catch (error) {
        next(err)
    }
}