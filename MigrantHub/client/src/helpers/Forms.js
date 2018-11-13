export function handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value,
  });
}
