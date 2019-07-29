import React from 'react';
import { render } from 'react-dom';
import './style/main.css'

console.clear();
const flexiConfig = {
  items: [
    {
      "name":"person_name",
      "label":"Person's Name",
      "type":"TextField"
    },
    {
      "name":"states",
      "label":"Person's state",
      "type":"DropDown",
      "values":[
        "Maharashtra","Kerala","Tamilnadu"
      ]
    }
  ]
};

const onFlexiSubmit = (event, formData) => {
  //We can do any logic here
  event.preventDefault();
  console.info("test",formData);
}

const TextField = ({name, labelName, handleChange}) => (
  <div className="row">
    <div className="col-25">
      <label htmlFor={labelName}>{labelName}</label>
    </div>
    <div className="col-75">
      <input type="text" id={name} name={name} placeholder={labelName} onChange={event => handleChange(event)} />
    </div>
  </div>)

const DropDown = ({name, labelName, handleChange, values }) => (
  <div className="row">
  <div className="col-25">
    <label htmlFor={labelName}>{labelName}</label>
  </div>
  <div className="col-75">
      <select name={name} onChange={event => handleChange(event)} >
        <option value=''>Select {labelName}</option>
        {values.map(row => <option value={row} key={row}>{row}</option>) }
      </select>
  </div>
</div>)

// Contaner Component
class Flexi extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

	handleChange (event) {
		this.setState(
		{[event.target.name] : event.target.value}
    );
	}

  render(){
    // Render JSX
    const {config, onSubmit} = this.props;
    return (
      <div className="container">
          <h3>Dynamic Form Field Type</h3>
          <form onSubmit={event => onSubmit(event, this.state)}>
            {config.items.map(rowData => {
                  if(rowData.type === "TextField"){
                    return (
                      <TextField name={rowData.name} labelName={rowData.label} handleChange={this.handleChange} />
                    );
                  } else if(rowData.type === "DropDown"){
                    return (
                      <DropDown name={rowData.name} labelName={rowData.label} values={rowData.values} handleChange={this.handleChange} />
                    );
                  }
            })}
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
          </form>
      </div>
    );
  }
}
render(<Flexi onSubmit={onFlexiSubmit} config={flexiConfig} />, document.getElementById('root'));
