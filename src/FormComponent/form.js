import React from 'react';

const Form = (props) => {
    return(
        <div className="input-form">
            <form onSubmit={(e) => props.submit(e)}>
                <div className="city-div">
                    <label>City:</label>
                    <input type="text" name="city" />
                </div>
                <div className="country-div">
                    <label>Country:</label>
                    <input type="text" name="country" />
                </div>
                <br/>
                <button>Search!</button>
            </form>
        </div>    
    )
}

export default Form;