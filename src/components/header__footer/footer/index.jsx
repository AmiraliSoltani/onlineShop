import React, { useContext } from 'react';
import "./footer.scss";
import "./../../../css/footer.css";
import blurContext from '../../contexts/blur';


function Footer() {
  const {blurState,blurDispatch}=useContext(blurContext)
  // console.log("blur",blurState)
  // blurDispatch({type:"activeBlur"})

  return (
    <footer  className={blurState.blur ? 'blurred' : ''}>
      <div className="mainfooter">
        <div className="container">
          <div className="footer__top">
            <div className="footer__top__image image1">
              <img src={require("./../../../assets/icons/free.png")} alt="" />
              <span>Free shipping on first order</span>
            </div>
            <div className="footer__top__image image2">
              <img src={require("./../../../assets/icons/24.png")} alt="" />
              <span>Fast packaging & shipping</span>
            </div>
            <div className="footer__top__image image3">
              <img src={require("./../../../assets/icons/shield.png")} alt="" />
              <span>Authenticity guarantee</span>
            </div>
            <div className="footer__top__image image4">
              <img
                src={require("./../../../assets/icons/time-and-date.png")}
                alt=""
              />
              <span>24/7 Customer support</span>
            </div>
          </div>
          <hr />
        </div>

        <div className="footer__middle">
          <div className="container">
            <div className="footer__middle__main">
            <div className="footer__middle__left">
                <div className="footer__middle__left__first">
                  <span>Follow us on social media</span>
                  <ul>
                    <li>
                      <img
                        src={require("./../../../assets/icons/011-youtube.png")}
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src={require("./../../../assets/icons/035-whatsapp.png")}
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src={require("./../../../assets/icons/025-instagram.png")}
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src={require("./../../../assets/icons/029-telegram.png")}
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
                <div className="footer__middle__left__second">
                  <div className="icon__image">
                    <img
                      src={require("./../../../assets/icons/telephone2.png")}
                      alt=""
                    />
                  </div>
                  <div className="phone__number">(514) 815-0492</div>
                </div>
              </div>
              <div className="footer__middle__right">
                <ul>
                  <li>
                    <span>Shopping Guide</span>
                    <ul className="sub_cat">
                      <li className='hover-item'>
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Shipping Information</span> 
                        </li>
                        <li className="second hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Delivery Details</span> 
                        </li>
                        <li className="third hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Payment Methods</span> 
                        </li>
                    </ul>
                  </li>
                  <li>
                    <span>Customer Services</span>
                    <ul className="sub_cat">
                    <li className='hover-item'>
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">FAQ & Support</span> 
                        </li>
                        <li className="second hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Return Guidelines</span> 
                        </li>
                        <li className="third hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Terms & Policies</span> 
                        </li>
                    </ul>
                  </li>
                  <li>
                    <span>Exclusive Offers</span>
                    <ul className="sub_cat">
                    <li className='hover-item'>
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Loyalty Program</span> 
                        </li>
                        <li className="second hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Deals & Promotions</span> 
                        </li>
                        <li className="third hover-item">
                        <img src={require("./../../../assets/icons/record.png")} alt="" className="subcat-image" />
                         <span className="text">Referral Program</span> 
                        </li>
                    </ul>
                  </li>
                </ul>
              </div>
         
            </div>
            <hr className="line" />
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container">
            <div className="footer__info">
              Website Designer:
              <div className="developer__name">Amirali Soltani</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
