import { Link } from 'react-router-dom';

export default function Card(props){
    return(
        <div className="card mt-2 mb-2">
            <div className="card-body">
                <div className="d-flex align-items-center position-relative">
                    <img src={`${props.apiHost}/images/${props.product.filename}`} className="thumbnail"/>
                    <div className="prod-info">
                        <h5 className="card-title">{ props.product.name }</h5>
                        <h6>{ props.product.trim }</h6>
                        <p className="card-text">
                            { props.product.name }<br />Cost: { props.product.cost }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
