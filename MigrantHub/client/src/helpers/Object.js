export function handleAddObject(name, object) {
  this.setState({
    [name]: this.state[name].concat([object]),
  });
}

export function handleRemoveObject(name, index) {
  this.setState({
    [name]: this.state[name].filter((s, _index) => _index !== index),
  });
}

export function handleEditObject(name, index) {
  return (event) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [event.target.name]: event.target.value };
      }),
    });
  };
}

export function handleEditSingleObject(name, fieldName) {
  return (event) => {
    const obj = {};
    obj[name] = { ...this.state[name] };
    const value = ((event.target.type === 'checkbox') ? event.target.checked
      : event.target.value);
    obj[name][fieldName] = value;
    this.setState({ [name]: obj[name] });
  };
}

export function objectErrorText(name, index, field) {
  return (this.state[name][index] === undefined ? '' : this.state[name][index][field]);
}
