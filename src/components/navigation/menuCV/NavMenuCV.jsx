import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { CvPaths } from '@configs/configs';
import { useDispatch, useSelector } from 'react-redux';
import { linkIsClicked } from '@actions';
import { useUpdateFieldsAllCv } from '@hooks';
import { selectIsDirtyFormConstructorCv, selectIsDirtyFormSpecificCv } from '@cvSteps/selectors';
import logo from '../../../static/images/menu-logo.svg';
import styles from './NavMenuCV.module.scss';

const NavMenu = ({ tabIndex = 0, ...props }) => {
  const isActiveLink = ({ isActive }) => (isActive ? styles.active : '');
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const path = uuid ? uuid : '';
  const dispatch = useDispatch();
  const isDirtyFormConstructorCv = useSelector(selectIsDirtyFormConstructorCv);
  const isDirtyFormSpecificCv = useSelector(selectIsDirtyFormSpecificCv);
  const updateFieldsAllCv = useUpdateFieldsAllCv();

  const {
    personalInformation: { uuid: isPersonalInformationExists },
    isContactsExists,
    isAboutExists
  } = useSelector((state) => state.specificCvReducer);

  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if ((isDirtyFormConstructorCv || isDirtyFormSpecificCv) && pathname !== href) {
      e.preventDefault();
      dispatch(linkIsClicked(e.currentTarget.getAttribute('href')));
    } else if ((!isDirtyFormConstructorCv || !isDirtyFormSpecificCv) && href === CvPaths.INDEX) {
      updateFieldsAllCv();
    }
  };

  const prevent = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <img src={logo} alt='logo' />
      </div>
      <nav className={styles.sidebar__nav}>
        <NavLink
          to={CvPaths.INDEX}
          tabIndex={tabIndex}
          onClick={handleClick}
          className={styles.sidebar__link}
        >
          <svg
            width='18'
            height='14'
            viewBox='0 0 18 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.1517 12.6859C7.43668 12.9865 7.43668 13.4739 7.1517 13.7745C6.86672 14.0752 6.40468 14.0752 6.1197 13.7745L0.213734 7.54433C0.0768824 7.39996 0 7.20416 0 7C0 6.79584 0.0768824 6.60004 0.213734 6.45567L6.1197 0.225468C6.40468 -0.0751562 6.86672 -0.0751562 7.1517 0.225468C7.43668 0.526091 7.43668 1.0135 7.1517 1.31412L2.49177 6.22988H17.2703C17.6733 6.22988 18 6.57453 18 6.99968C18 7.42482 17.6733 7.76947 17.2703 7.76947H2.49116L7.1517 12.6859Z'
              fill='#407BFF'
            />
          </svg>
          <p>Personal cabinet</p>
        </NavLink>
        <NavLink
          to={path ? CvPaths.PERSONALINFORMATION + path : CvPaths.PERSONALINFORMATION}
          tabIndex='-1'
          onClick={handleClick}
          className={({ isActive }) => (isActive ? styles.active : styles.available)}
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.72093 6.13953C3.72093 5.83128 3.97082 5.5814 4.27907 5.5814H11.7209C12.0292 5.5814 12.2791 5.83128 12.2791 6.13953C12.2791 6.44779 12.0292 6.69767 11.7209 6.69767H4.27907C3.97082 6.69767 3.72093 6.44779 3.72093 6.13953Z'
                  fill='#25225D'
                />
                <path
                  d='M4.27907 9.30233C3.97082 9.30233 3.72093 9.55221 3.72093 9.86047C3.72093 10.1687 3.97082 10.4186 4.27907 10.4186H9.48837C9.79662 10.4186 10.0465 10.1687 10.0465 9.86047C10.0465 9.55221 9.79662 9.30233 9.48837 9.30233H4.27907Z'
                  fill='#25225D'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.27975 1.27975C2.16553 0.39398 3.44885 0 5.02326 0H10.9767C12.5512 0 13.8345 0.39398 14.7202 1.27975C15.606 2.16553 16 3.44885 16 5.02326V10.9767C16 12.5512 15.606 13.8345 14.7202 14.7202C13.8345 15.606 12.5512 16 10.9767 16H1.30233C0.584771 16 0 15.4152 0 14.6977V5.02326C0 3.44885 0.39398 2.16553 1.27975 1.27975ZM2.06908 2.06908C1.46649 2.67168 1.11628 3.62092 1.11628 5.02326V14.6977C1.11628 14.7987 1.20128 14.8837 1.30233 14.8837H10.9767C12.3791 14.8837 13.3283 14.5335 13.9309 13.9309C14.5335 13.3283 14.8837 12.3791 14.8837 10.9767V5.02326C14.8837 3.62092 14.5335 2.67168 13.9309 2.06908C13.3283 1.46649 12.3791 1.11628 10.9767 1.11628H5.02326C3.62092 1.11628 2.67168 1.46649 2.06908 2.06908Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>Personal information</p>
          </div>
        </NavLink>
        <NavLink
          to={CvPaths.CONTACTS + path}
          tabIndex='-1'
          onClick={isPersonalInformationExists ? handleClick : prevent}
          className={({ isActive }) =>
            isActive ? styles.active : isPersonalInformationExists ? styles.available : ''
          }
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className={styles.stroke}
                  d='M17 14.064C17 14.352 16.9359 14.648 16.7997 14.936C16.6635 15.224 16.4872 15.496 16.2549 15.752C15.8623 16.184 15.4296 16.496 14.9409 16.696C14.4602 16.896 13.9394 17 13.3786 17C12.5613 17 11.688 16.808 10.7666 16.416C9.84527 16.024 8.92389 15.496 8.01052 14.832C7.08913 14.16 6.21582 13.416 5.38257 12.592C4.55734 11.76 3.81222 10.888 3.14722 9.976C2.49024 9.064 1.96144 8.152 1.57687 7.248C1.19229 6.336 1 5.464 1 4.632C1 4.088 1.09614 3.568 1.28843 3.088C1.48072 2.6 1.78518 2.152 2.20981 1.752C2.72258 1.248 3.28343 1 3.87631 1C4.10065 1 4.32499 1.048 4.52529 1.144C4.7336 1.24 4.91788 1.384 5.06209 1.592L6.92088 4.208C7.0651 4.408 7.16925 4.592 7.24136 4.768C7.31347 4.936 7.35353 5.104 7.35353 5.256C7.35353 5.448 7.29745 5.64 7.18528 5.824C7.08112 6.008 6.92889 6.2 6.7366 6.392L6.12769 7.024C6.03956 7.112 5.9995 7.216 5.9995 7.344C5.9995 7.408 6.00751 7.464 6.02354 7.528C6.04757 7.592 6.07161 7.64 6.08763 7.688C6.23185 7.952 6.48022 8.296 6.83275 8.712C7.19329 9.128 7.57787 9.552 7.99449 9.976C8.42714 10.4 8.84377 10.792 9.2684 11.152C9.68503 11.504 10.0295 11.744 10.302 11.888C10.342 11.904 10.3901 11.928 10.4462 11.952C10.5103 11.976 10.5744 11.984 10.6465 11.984C10.7827 11.984 10.8868 11.936 10.975 11.848L11.5839 11.248C11.7842 11.048 11.9765 10.896 12.1607 10.8C12.345 10.688 12.5293 10.632 12.7296 10.632C12.8818 10.632 13.0421 10.664 13.2183 10.736C13.3946 10.808 13.5789 10.912 13.7792 11.048L16.4311 12.928C16.6395 13.072 16.7837 13.24 16.8718 13.44C16.9519 13.64 17 13.84 17 14.064Z'
                  stroke='#25225D'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                />
              </svg>
            </div>
            <p>Contacts</p>
          </div>
        </NavLink>
        <NavLink
          to={CvPaths.ABOUTYOURSELF + path}
          tabIndex='-1'
          onClick={isContactsExists ? handleClick : prevent}
          className={({ isActive }) =>
            isActive ? styles.active : isContactsExists ? styles.available : ''
          }
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='12'
                height='16'
                viewBox='0 0 12 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6.14233 0C3.86335 0 2.02872 1.85018 2.02872 4.12672C2.02872 5.9402 3.18791 7.47959 4.80889 8.03063C3.686 8.18093 2.59969 8.54651 1.70453 9.14194L1.70234 9.1434C0.620165 9.87014 0 10.8853 0 11.9756C0 13.0662 0.620376 14.0796 1.70316 14.8025C2.91116 15.6131 4.4713 16 6 16C7.529 16 9.08945 15.6129 10.2975 14.802C11.3797 14.0753 12 13.0601 12 11.9697C12 10.8792 11.3797 9.86592 10.2971 9.14305C9.45601 8.57948 8.4422 8.22183 7.38659 8.05735C9.05005 7.53088 10.2483 5.97092 10.2559 4.12921L10.2559 4.12672C10.2559 1.8493 8.41251 0 6.14233 0ZM3.21762 4.12672C3.21762 2.50713 4.5217 1.19269 6.14233 1.19269C7.75549 1.19269 9.06638 2.50735 9.06703 4.12551C9.05982 5.70353 7.83127 6.98202 6.28262 7.05182C6.18893 7.04501 6.08961 7.04533 5.9956 7.05189C4.44543 6.98282 3.21762 5.70348 3.21762 4.12672ZM1.1889 11.9756C1.1889 11.3746 1.52749 10.6965 2.36262 10.1353C3.33865 9.48644 4.65778 9.14399 6.00594 9.14399C7.35479 9.14399 8.6695 9.48676 9.63682 10.1349L9.6377 10.1355C10.4727 10.6927 10.8111 11.3688 10.8111 11.9697C10.8111 12.571 10.4722 13.2494 9.63629 13.8108C8.66474 14.4629 7.3481 14.8073 6 14.8073C4.65185 14.8073 3.33516 14.4629 2.3636 13.8107L2.3623 13.8099C1.52735 13.2526 1.1889 12.5765 1.1889 11.9756Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>About yourself</p>
          </div>
        </NavLink>
        <NavLink
          to={CvPaths.SKILLS + path}
          tabIndex='-1'
          onClick={prevent}
          className={({ isActive }) =>
            isActive ? styles.active : isAboutExists ? styles.available : ''
          }
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className={styles.stroke}
                  d='M10.3831 2.15534L11.7911 4.9943C11.9831 5.3895 12.4951 5.76856 12.9271 5.84115L15.4791 6.2686C17.1111 6.54282 17.4951 7.73647 16.3191 8.914L14.3351 10.9142C13.9991 11.2529 13.8151 11.9062 13.9191 12.374L14.4871 14.85C14.9351 16.8098 13.9031 17.568 12.1831 16.5437L9.79115 15.1162C9.35915 14.8581 8.64715 14.8581 8.20715 15.1162L5.81515 16.5437C4.10315 17.568 3.06315 16.8018 3.51115 14.85L4.07915 12.374C4.18315 11.9062 3.99915 11.2529 3.66315 10.9142L1.67915 8.914C0.511146 7.73647 0.887146 6.54282 2.51915 6.2686L5.07115 5.84115C5.49515 5.76856 6.00715 5.3895 6.19915 4.9943L7.60715 2.15534C8.37515 0.614886 9.62315 0.614886 10.3831 2.15534Z'
                  stroke='#25225D'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <p>Skills</p>
          </div>
        </NavLink>
        <NavLink
          to={`/cv/experience/${path}`}
          tabIndex='-1'
          onClick={prevent}
          className={isActiveLink}
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4.38135 2.97674H4.19075C2.49713 2.97674 1.34064 3.35968 0.666087 4.14305C-0.00191747 4.91882 -0.0654546 5.93799 0.0416075 6.88829L0.612556 12.8372L0.613313 12.8446C0.697232 13.6097 0.893814 14.4485 1.59314 15.0725C2.2873 15.692 3.36274 16 4.9526 16H11.0474C12.6373 16 13.7127 15.692 14.4069 15.0725C15.1062 14.4485 15.3028 13.6097 15.3867 12.8446L15.3874 12.8372L15.9129 7.36204C15.92 7.32612 15.9236 7.28955 15.9234 7.25289L15.9584 6.88828C16.0655 5.93798 16.0019 4.91882 15.3339 4.14305C14.6594 3.35968 13.5029 2.97674 11.8092 2.97674H11.6189L11.6189 2.9202C11.6189 2.60502 11.619 2.26075 11.576 1.93949C11.5315 1.60661 11.4362 1.25321 11.2128 0.937546C10.743 0.273482 9.88228 0 8.60961 0H7.39065C6.11799 0 5.25729 0.273482 4.78743 0.937546C4.56408 1.25321 4.46874 1.60661 4.42425 1.93949C4.38131 2.26075 4.38133 2.60501 4.38135 2.92019L4.38135 2.97674ZM5.55741 2.084C5.52504 2.32615 5.52412 2.60134 5.52412 2.93953V2.97674H10.4761V2.93953C10.4761 2.60134 10.4752 2.32615 10.4429 2.084C10.4112 1.84688 10.3541 1.68725 10.2727 1.57222C10.1331 1.37489 9.77487 1.11628 8.60961 1.11628H7.39065C6.2254 1.11628 5.86714 1.37489 5.72752 1.57222C5.64613 1.68725 5.5891 1.84688 5.55741 2.084ZM14.821 6.77953L14.8046 6.95116C13.3625 7.92962 11.7529 8.56097 10.0952 8.85335L10.0952 8.71974C10.0953 8.55518 10.0953 8.38839 10.0798 8.25232C10.064 8.1136 10.0219 7.88319 9.83263 7.69836C9.64341 7.51353 9.40753 7.47231 9.26553 7.4569C9.12621 7.44178 8.95548 7.44182 8.78701 7.44186H7.21326C7.04478 7.44182 6.87405 7.44178 6.73474 7.4569C6.59273 7.47231 6.35685 7.51353 6.16763 7.69836C5.97841 7.88319 5.93622 8.1136 5.92045 8.25232C5.90497 8.3884 5.90501 8.55517 5.90504 8.71973L5.90505 8.86872C4.2553 8.59712 2.64731 7.97386 1.20128 7.01213L1.17895 6.77953L1.17798 6.77024C1.08009 5.90607 1.18125 5.27896 1.54063 4.8616C1.89458 4.45055 2.63128 4.09302 4.19075 4.09302H11.8092C13.3687 4.09302 14.1054 4.45055 14.4594 4.8616C14.8188 5.27896 14.9199 5.90607 14.822 6.77024L14.821 6.77953ZM1.33586 8.41442L1.74998 12.7293C1.8262 13.4209 1.98399 13.9093 2.36393 14.2484C2.74969 14.5927 3.47983 14.8837 4.9526 14.8837H11.0474C12.5202 14.8837 13.2503 14.5927 13.6361 14.2484C14.016 13.9093 14.1738 13.4209 14.25 12.7293L14.6691 8.36233C13.2342 9.19383 11.6756 9.73351 10.0824 9.98815C10.0782 10.0425 10.0726 10.0969 10.0652 10.1505C10.034 10.3757 9.9657 10.6312 9.79853 10.8644C9.44202 11.3616 8.81258 11.5349 8.00013 11.5349C7.19214 11.5349 6.56429 11.3638 6.20644 10.8707C6.03818 10.6388 5.96854 10.3841 5.93645 10.1589C5.92903 10.1068 5.92337 10.0541 5.91904 10.0014C4.32758 9.76525 2.77049 9.23234 1.33586 8.41442ZM7.04782 9.52196C7.04789 9.72574 7.05003 9.87666 7.06832 10.005C7.08623 10.1308 7.11467 10.1919 7.13878 10.2252C7.16567 10.2622 7.29966 10.4186 8.00013 10.4186C8.70377 10.4186 8.83617 10.2607 8.86249 10.224C8.88673 10.1902 8.91511 10.128 8.93273 10.0009C8.95083 9.87017 8.95241 9.71745 8.95244 9.51067C8.95236 9.50523 8.95236 9.49981 8.95245 9.49441V8.74419C8.95245 8.67241 8.95243 8.61186 8.95184 8.55873C8.89745 8.55815 8.83546 8.55814 8.76198 8.55814H7.23828C7.1648 8.55814 7.10281 8.55815 7.04843 8.55873C7.04783 8.61186 7.04782 8.67241 7.04782 8.74419V9.49728C7.04801 9.50547 7.04801 9.5137 7.04782 9.52196Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>Work experience</p>
          </div>
        </NavLink>
        <NavLink
          to={`/cv/education/${path}`}
          tabIndex='-1'
          onClick={prevent}
          className={isActiveLink}
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M9.88997 0.495394L9.89189 0.496603L14.6008 3.41939C15.6303 4.0586 16.0917 5.13204 15.9849 6.1604V10.2354C15.9849 10.5437 15.7208 10.7936 15.3949 10.7936C15.069 10.7936 14.8049 10.5437 14.8049 10.2354V8.18222C14.7395 8.23005 14.6715 8.27599 14.6008 8.31988L13.6088 8.93561V12.2972C13.6088 12.9081 13.3628 13.5091 12.9942 13.9937C12.6255 14.4782 12.1016 14.8892 11.4903 15.0819L8.97464 15.8728C8.67798 15.963 8.32362 16 7.99653 16C7.66996 16 7.31605 15.9631 7.02136 15.8718L7.01882 15.871L4.50917 15.0821C3.89793 14.8893 3.37343 14.4782 3.0048 13.9937C2.6361 13.5091 2.39013 12.9081 2.39013 12.2972L2.39013 12.296L2.39771 8.93293L1.40628 8.32061C-0.468753 7.16253 -0.468761 4.56934 1.40627 3.41126L6.14077 0.487177L6.14158 0.486676C6.68352 0.14989 7.36557 -0.0010697 8.01578 5.70358e-06C8.66557 0.0010804 9.34783 0.154112 9.88997 0.495394ZM14.8107 5.69081C14.8069 5.71658 14.8049 5.74292 14.8049 5.76969V6.09814C14.7387 6.59755 14.4549 7.07506 13.9534 7.38645L9.24092 10.3115C8.93329 10.5028 8.48998 10.6164 8.01475 10.6164C7.53952 10.6164 7.09666 10.5031 6.78903 10.3118L2.05138 7.38576C0.889662 6.66823 0.889653 5.06363 2.05137 4.34611L6.78745 1.42106L6.78903 1.42007C7.09663 1.22877 7.53923 1.11565 8.01372 1.11644C8.48818 1.11722 8.93009 1.23177 9.2373 1.42553L9.24092 1.4278L13.9533 4.35282C14.4715 4.67452 14.7573 5.17354 14.8107 5.69081ZM9.88873 11.2447L12.4287 9.66809V12.2972C12.4287 12.6315 12.2892 13.0092 12.0364 13.3415C11.7836 13.6738 11.4501 13.9178 11.1173 14.0227L8.61114 14.8106C8.46714 14.854 8.24435 14.8836 7.99653 14.8836C7.74743 14.8836 7.5275 14.8537 7.38943 14.8111L7.38841 14.8108L4.88182 14.0228C4.54906 13.9178 4.21539 13.6738 3.96256 13.3415C3.70988 13.0094 3.57037 12.6319 3.57022 12.2977L3.57616 9.66076L6.14077 11.2447L6.14156 11.2452C6.68347 11.5819 7.36528 11.7328 8.01475 11.7328C8.66444 11.7328 9.34673 11.5817 9.88873 11.2447Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>Education</p>
          </div>
        </NavLink>
        <NavLink
          to={`/cv/additional/${path}`}
          tabIndex='-1'
          onClick={prevent}
          className={isActiveLink}
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.04433 7.06977C8.35258 7.06977 8.60247 7.31966 8.60247 7.62791V8.93023H9.86047C10.1687 8.93023 10.4186 9.18012 10.4186 9.48837C10.4186 9.79662 10.1687 10.0465 9.86047 10.0465H8.60247V11.3488C8.60247 11.6571 8.35258 11.907 8.04433 11.907C7.73608 11.907 7.48619 11.6571 7.48619 11.3488V10.0465H6.13953C5.83128 10.0465 5.5814 9.79662 5.5814 9.48837C5.5814 9.18012 5.83128 8.93023 6.13953 8.93023H7.48619V7.62791C7.48619 7.31966 7.73608 7.06977 8.04433 7.06977Z'
                  fill='#25225D'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4.27907 0C2.79469 0 1.64329 0.172029 0.907661 0.907661C0.172029 1.64329 0 2.79469 0 4.27907V11.7209C0 13.2053 0.172029 14.3567 0.907661 15.0923C1.64329 15.828 2.79469 16 4.27907 16H11.7209C13.2053 16 14.3567 15.828 15.0923 15.0923C15.828 14.3567 16 13.2053 16 11.7209V7.25581C16 5.77143 15.828 4.62004 15.0923 3.88441C14.3567 3.14877 13.2053 2.97674 11.7209 2.97674H9.48837C9.16665 2.97674 9.05548 2.92735 9.0087 2.89907C8.94744 2.86204 8.89855 2.8077 8.74316 2.60328L7.6034 1.08357C7.41014 0.825411 7.18431 0.523761 6.83532 0.314112C6.45828 0.087608 6.00181 0 5.39535 0H4.27907ZM1.11628 4.27907C1.11628 2.78671 1.31634 2.07764 1.69699 1.69699C2.07764 1.31634 2.78671 1.11628 4.27907 1.11628H5.39535C5.90517 1.11628 6.12963 1.19239 6.26049 1.271C6.40456 1.35755 6.50947 1.48549 6.73488 1.78605L7.85116 3.27442L7.8533 3.27726L7.87663 3.30805C8.00113 3.47266 8.17076 3.69695 8.4313 3.85442C8.72312 4.03079 9.06591 4.09302 9.48837 4.09302H11.7209C13.2133 4.09302 13.9224 4.29309 14.303 4.67373C14.6837 5.05438 14.8837 5.76345 14.8837 7.25581V11.7209C14.8837 13.2133 14.6837 13.9224 14.303 14.303C13.9224 14.6837 13.2133 14.8837 11.7209 14.8837H4.27907C2.78671 14.8837 2.07764 14.6837 1.69699 14.303C1.31634 13.9224 1.11628 13.2133 1.11628 11.7209V4.27907Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>Additional information</p>
          </div>
        </NavLink>
        <NavLink
          to={`/cv/recommendations/${path}`}
          tabIndex='-1'
          onClick={prevent}
          className={isActiveLink}
        >
          <div className={styles.sidebar__nav__link}>
            <div className={styles.sidebar__nav__link__icon}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M10.946 2.52583C11.1557 1.50447 10.5104 0.443508 9.56699 0.114769C9.10937 -0.0581109 8.62502 -0.0194081 8.22152 0.122981C7.81933 0.264912 7.43449 0.531989 7.19596 0.898676L7.19528 0.899726L4.90297 4.40092C4.81845 4.1211 4.67903 3.86932 4.46204 3.66369C4.0481 3.27143 3.47745 3.16956 2.89306 3.16956H2.12158C1.53719 3.16956 0.966542 3.27143 0.552606 3.66369C0.127299 4.06672 0 4.64703 0 5.26836V13.03C0 13.6513 0.127299 14.2316 0.552606 14.6346C0.966542 15.0269 1.53719 15.1287 2.12158 15.1287H2.89306C3.47745 15.1287 4.0481 15.0269 4.46204 14.6346C4.63908 14.4669 4.76448 14.2684 4.85055 14.049L6.52611 15.3807C6.78097 15.6265 7.12756 15.7722 7.42132 15.8583C7.74095 15.9521 8.08372 16 8.37105 16H11.3027C11.9043 16 12.5039 15.7715 12.9848 15.4102C13.4605 15.0529 13.8598 14.5352 14.0186 13.9093L15.8619 8.15345C16.1087 7.43737 16.0216 6.71469 15.6259 6.16345C15.2316 5.61407 14.5837 5.30801 13.8486 5.30801H10.7626C10.6933 5.30801 10.6405 5.27926 10.6083 5.24171C10.5804 5.20933 10.549 5.14868 10.5635 5.03869L10.946 2.52583ZM5.01464 12.677L7.28844 14.4842L7.31437 14.5108C7.36579 14.5636 7.50466 14.6473 7.73923 14.7161C7.95963 14.7807 8.19548 14.812 8.37105 14.812H11.3027C11.6269 14.812 11.9916 14.6842 12.3015 14.4514C12.6109 14.219 12.8249 13.9132 12.9015 13.5987L12.9066 13.5778L14.767 7.76853L14.7695 7.76143C14.9053 7.37117 14.8373 7.06739 14.6943 6.86817C14.5486 6.66515 14.2706 6.49601 13.8486 6.49601H10.7626C9.95772 6.49601 9.29 5.79002 9.41836 4.86761L9.41943 4.8599L9.80807 2.30683L9.81207 2.28836C9.89745 1.89393 9.6246 1.38671 9.191 1.23833L9.18084 1.23486L9.17081 1.231C9.01422 1.17071 8.80843 1.1721 8.59771 1.24645C8.38311 1.32219 8.22826 1.45074 8.15814 1.55871L8.15693 1.56057L5.01464 6.36001V12.677ZM1.15722 5.26836C1.15722 4.78089 1.26137 4.6088 1.33753 4.53663C1.42506 4.45369 1.62589 4.35756 2.12158 4.35756H2.89306C3.38875 4.35756 3.58958 4.45369 3.67711 4.53663C3.75327 4.6088 3.85742 4.78089 3.85742 5.26836V13.03C3.85742 13.5174 3.75327 13.6895 3.67711 13.7617C3.58958 13.8446 3.38875 13.9408 2.89306 13.9408H2.12158C1.62589 13.9408 1.42506 13.8446 1.33753 13.7617C1.26137 13.6895 1.15722 13.5174 1.15722 13.03V5.26836Z'
                  fill='#25225D'
                />
              </svg>
            </div>
            <p>Recommendations</p>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavMenu;