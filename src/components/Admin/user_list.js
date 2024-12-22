import React, {  useState } from 'react';
import { Link } from 'react-router-dom'
import './userList.css';




const UserList = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [access, setAccess] = useState(false);
    const [pinCode, setPinCode] = useState(null);
    const [randoms, setRandoms] = useState({ fNum: Math.floor(Math.random() * 10), sNum: Math.floor(Math.random() * 10) })
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = props.userList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(props.userList.length / ITEMS_PER_PAGE);
    // Handler to go to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Handler to go to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const changeHandler = (e) => {
        const value = e.target.value;
        if (value.length > 1) {
            if (value == ((randoms.fNum + randoms.sNum) + 24)) {
                setAccess(true);
            }
        }
    }


    return (
        <section className="wpo-blog-pg-section section-padding">
            <div className="container">
                {!access ?
                    <div class="m-auto">
                        <div className="form-field col">
                            <label>Input Answer to View ({randoms.fNum} + {randoms.sNum})</label>
                            <input
                                value={pinCode}
                                type="text"
                                name="pincode"
                                onChange={(e) => changeHandler(e)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                            <div className="wpo-blog-content">
                                <div className="user-list-container">
                                <div className="col-12 mb-3" >
                                            <div className="card shadow-sm border-0">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                        <i class="flaticon-user"></i>
                                                            <strong>Name</strong>
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                        <i class="flaticon-email"></i>
                                                            Email
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                            <i className="flaticon-lock text-success me-2"></i>
                                                            Access Code
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                            
                                                            Created At
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {currentItems.map((user, index) => (
                                        <div className="col-12 mb-3" key={index}>
                                            <div className="card shadow-sm border-0">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                            <strong>{user.name}</strong>
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center m-3">
                                                            {user.email}
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center m-3">
                                                            
                                                            {user.accessCode ? (
                                                                <span className="badge bg-success">Taken</span>
                                                            ) : (
                                                                <span className="badge bg-secondary">Not Taken</span>
                                                            )}
                                                        </div>
                                                        <div className="col-md-3 col-sm-6 mb-2 d-flex align-items-center">
                                                            
                                                            {user.create_at}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-wrapper pagination-wrapper-left">
                                    <ul className="pg-pagination">
                                        <li>
                                            <Link to="#" onClick={() => handleNextPage()} aria-label="Previous">
                                                <i className="fi ti-angle-left"></i>
                                            </Link>
                                        </li>
                                        {Array(totalPages).fill().map((pageNum) => {
                                            <li className={currentPage == pageNum ? "active" : ""}><Link onClick={() => setCurrentPage(currentPage)}>{currentPage}</Link></li>

                                        })}

                                        <li>
                                            <Link to="#" onClick={() => handleNextPage()} aria-label="Next">
                                                <i className="fi ti-angle-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <BlogSidebar blLeft={props.blLeft}/> */}
                    </div>
                }

            </div>
        </section>

    )

}

export default UserList;
