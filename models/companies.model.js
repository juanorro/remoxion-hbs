const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const companiesSchema = new Schema (
    {
        compname: {
            type: String, 
            require: 'El nombre de la empresa es obligatorio. Recuerda que se utilizará para la creación de las facturas'
        },
        comername: {
            type: String, 
        },
        contactname: {
            type: String,
            required: 'El nombre de contacto es obligatorio'
        },
        compemail: {
            type: String, 
            required: 'El email de empresa es obligatorio',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, rellena el email en un formato válido']
        },
        password: {
            type: String, 
            required: true,
        },
        vat: {
            type: String, 
            require: true
        },
        address: {
            type: String, 
            require: true
        },
        iconimg: {
            type: String, 
        },
        description: {
            type: String, 
        },
        website: {
            type: String,
        },
        timestamps: true,
        toObject: {
            virtual: true, 
        }
});

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(this.password, salt)
            })
            .then(hash => {
                this.password = hash,
                next();
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

jobsSchema.virtual('jobs', {
    ref: 'Jobs',
    foreignField: 'Company',
    localField: '_id',
    justOne: false
})

const Companies = mongoose.model('Companies', companiesSchema);
module.exports = Companies;