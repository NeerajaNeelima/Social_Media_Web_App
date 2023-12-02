import React from 'react';

const UserProfile = () => {
  return (
    <div className="container rounded bg-white mt-5">
      <div className="row">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              src="https://i.imgur.com/0eg0aG0.jpg"
              alt="Profile"
              width="90"
            />
            <span className="font-weight-bold">Neeraja Naru</span>
            <span className="text-black-50">023neeraja@gmail.com</span>
            <span>India</span>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex flex-row align-items-center back">
                <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                <h6>Back to home</h6>
              </div>
              <h6 className="text-right">Edit Profile</h6>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  defaultValue="Naru"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Neeraja"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="row mt-3">
            
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  defaultValue="023neeraja@gmail.com"
                />
              </div>
              
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="+91 9346571625"
                  placeholder="Phone number"
                />
              </div>
              
              
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="address"
                  defaultValue="1-378, Asiritalli Temple, Ragolu, Srikakulam , Andhra Pradesh"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="India"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="row mt-3">
              
              
            </div>
            <div className="mt-5 text-right">
              <button className="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
