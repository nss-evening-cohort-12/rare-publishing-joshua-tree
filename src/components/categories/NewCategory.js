import React from 'react';


class NewCategory extends React.Component {
  state = {
    category_name: '',
  }

  changeCategoryNameEvent = (e) => {
    e.preventDefault();
    this.setState({ category_name: e.target.value });
  }


  saveCategories = (e) => {
    e.preventDefault();

    const keysIWant = ['color', 'type', 'weight', 'isOwned', 'material', 'notes'];
    const newYarns = _.pick(this.state, keysIWant);
    newYarns.uid = authData.getUid();

    yarnsData.createYarns(newYarns)
      .then((res) => {
        this.props.history.push('/inventory');
      })
      .catch((err) => console.error('new yarns not happening', err));
  }

  render() {
    const {
      color,
      type,
      weight,
      material,
      notes,
    } = this.state;

    return (
      <div className="NewYarn">
        <h1>Woohoo! New Yarn!</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="">Color</label>
              <input
                type="text"
                className="form-control"
                id="yarnColor"
                placeholder="blue"
                value={color}
                onChange={this.changeColorEvent}
                />
            <label htmlFor="">Type</label>
              <input
                type="text"
                className="form-control"
                id="yarnType"
                placeholder="bulky"
                value={type}
                onChange={this.changeTypeEvent}
                />
            <label htmlFor="">Weight (in grams)</label>
              <input
                type="text"
                className="form-control"
                id="yarnWeight"
                placeholder="200"
                value={weight}
                onChange={this.changeWeightEvent}
                />
            <label htmlFor="">Material</label>
              <input
                type="text"
                className="form-control"
                id="yarnMaterial"
                placeholder="wool"
                value={material}
                onChange={this.changeMaterialEvent}
                />
            <label htmlFor="">Notes</label>
              <input
                type="text"
                className="form-control"
                id="yarnNotes"
                placeholder="My favorite yarn!"
                value={notes}
                onChange={this.changeNotesEvent}
                />
            </div>
          <button className="btn btn-secondary" onClick={this.saveYarns}>Save Yarn</button>
        </form>
      </div>
    );
  }
}

export default NewCategory;
