import React from 'react';
import categoryShape from './categoryShape';



class CategoryCards extends React.Component {
  static propTypes = {
    category: categoryShape.categoryShape,
  }

  render() {
    const { category } = this.props;

    return (
        <div className="card categoryCard">
          <div className="card-header font-weight-bold">
            {category.category_name}
          </div>
        </div>
    );
  }
}

export default CategoryCards;
