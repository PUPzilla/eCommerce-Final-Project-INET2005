import { Link } from 'react-router-dom';

export default function Card(props){
    const { apiHost, product, showLinks } = props;

    return(
        <div className="card mt-2 mb-2">
            <div className="card-body">
                <div className="d-flex align-items-center position-relative">

                    <img src={`${apiHost}/images/${product.filename}`} className="thumbnail"/>

                    <div className="prod-info">
                        <h5 className="card-title">{ product.name }</h5>
                        <p className="card-text">
                            Cost: ${ product.cost }
                        </p>
                    </div>
                </div>
                {showLinks && (
                    <div className='mt-3'>
                        <Link to={`/details/${product.product_id}`} className='btn btn-primary'>View Details</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
