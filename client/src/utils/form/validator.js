'use strict'

/* Required */
const isNullOrUndefined = value => {
    return value === null || value === undefined
}

const isStringEmpty = value => {
    return value === ''
}

const passRequired = (value) => {
    return  !isNullOrUndefined(value) || isStringEmpty(value)
}

/* Min */
const passMin = (value, min) => {
    return value.length >= min
}

/* Max */
const passMax = (value, max) => {
    return value.length >= max
}

/* Match */
const passMatch = (value, regex) => {
    return value.match(regex) !== []
}

/* include */
const passInclude = (value, include) => {
    return value.indexOf(include) !== -1
}

class Error {
    constructor(msg) {
        this.msg = msg
        this.error = false
        this.value = null
        this.active = false
    }
}

class Validator {
    constructor(value) {
        this.value = value
        this._required = new Error()
        this._min = new Error()
        this._max = new Error()
        this._match = new Error()
        this._include = new Error()

        this.valid = true
        this.errorMessage = undefined
    }

    required(msg) {
        this._required.active = true
        this._required.msg = msg
        return this
    }

    min (length, msg) {
        this._min.active = (true)
        this._min.value = (length)
        this._min.msg = msg
        return this 
    }

    max(max, msg) {
        this._max.active = (true)
        this._max.value = (max)
        this._max.msg = msg
        return this
    }

    match(match, msg) {
        this._match.active = (true)
        this._match.value = (match)
        this._match.msg = msg
        return this
    }

    include(include, msg) {
        this._include.active = (true)
        this._include.value = (include)
        this._include.msg = msg
        return this
    }

    validate() {
        if (this._required.active && !passRequired(this.value)){
            this.onError(this._required.msg)       
            return this._required
        }

        if (this._min.active && !passMin(this.value, this._min.value)){
            this.onError(this._min.msg)
            return this._min
        }

        if (this._max.active && !passMax(this.value, this._max.value)){
            this.onError(this._max.msg)
            return this._max
        }

        if (this._match.active && !passMatch(this.value, this._match.value)){
            this.onError(this._match.msg)
            return this._match
        }

        if (this._include.active && !passInclude(this.value, this._include.value)){
            this.onError(this._include.msg)
            return this._include
        }

        this.valid = true
        return true
    }

    onError(errorMessage){
        this.errorMessage = errorMessage
        this.valid = false
    }

}

const Test = () => {
    //let a = new Validator('henrique.guirelli@fatec.sp.gov.br').required().required().
    //console.log(a.include, typeof a)
    let validator = new Validator('henrique.guirelli@fatec.sp.gov.br')
    let valid = validator.required('aaa').include('@afatec.sp.gov.br', 'email precisa ser d afatec').validate()
    console.log(valid, validator.errorMessage)
}

Test()

//export default Validator