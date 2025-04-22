import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import Progress from './Progress';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { NumericFormat } from 'react-number-format';

export const DeployToken = () => {

  const captchaRef = useRef(null);
  const address = useAddress();
  const [file, setFile] = useState('');
  const [uploadedFile, setuploadedFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [TokenName, setTokenName] = useState('');
  const [TokenSymbol, setTokenSymbol] = useState('');
  const [TokenAmount, setTokenAmount] = useState("0");
  const [siteKey, setSiteKey] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  var save = (<><i className="fas fa-check-circle"></i><b> Save</b></>);
  var load = (<><i className="fas fa-sync fa-spin"></i><b> Loading</b></>);

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  useEffect(() => {
    try {
      const getConfig = () => {
        axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
        }).then((response) => {
          setSiteKey(response.data[0].recaptcha_site_key);
        });
      };
      getConfig();
    } catch (err) {
      toastEffect("error", "Code: 101993");
    }
  }, [siteKey]);

  useEffect(() => {
    try {
      const getAdminAccounts = async () => {
        await axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
        }).then(async (response) => {
          const isFound = await response.data.some(element => {
            if (element.wallet === address) {
              return element;
            }
            return false;
          });
          const isAdmin = await response.data.find(({ wallet }) => wallet === address);
          setIsAdmin(isFound);
          setAdminAccount(isAdmin);
        });
      };
      getAdminAccounts();
    } catch (err) {
      toastEffect("error", "Code: 101994");
    }
  }, [address]);

  useEffect(() => {
    try {
      const displayIMG = () => {
        const chooseFile = document.getElementById("choose-file");
        const imgPreview = document.getElementById("img-preview");
        const imgName = document.getElementById("img-name");

        chooseFile.addEventListener("change", function () {
          getImgData();
        });

        function getImgData() {
          const files = chooseFile.files[0];
          if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
              imgPreview.style.display = "block";
              imgPreview.innerHTML = '<img src="' + this.result + '" />';
              imgName.innerHTML = files.name;
            });
          }
        }
      };
      displayIMG();
    } catch (err) {
      toastEffect("error", "Code: 101995");
    }
  }, [file]);

  const handleTokenName = event => {
    setTokenName(event.target.value);
  };
  const handleTokenSymbol = event => {
    setTokenSymbol(event.target.value);
  };
  const handleTokenAmount = event => {
    setTokenAmount(event.target.value);
  };

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  function response(type, msg) {
    setIsClicked(false);
    sweetAlertEffect(type, msg);
  }

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    formData.append('file', file);
    var cleanAmount = TokenAmount.replace(/,/g, "");
    const tokenName = TokenName;
    const tokenSymbol = TokenSymbol;
    const tokenAmount = cleanAmount;
    const token = captchaRef.current.getValue();
    //captchaRef.current.reset();
    setIsClicked(true);

    if (!address || !isAdmin) {
      return;
    }
    if (TokenName === '') {
      response("error", "Token name should not be empty!");
      return;
    }
    if (TokenName.length > 15) {
      response("error", "Max of 15 characters only for Token name");
      return;
    }
    if (tokenSymbol.length > 5) {
      response("error", "Max of 5 characters only for Token Symbol");
      return;
    }
    if (tokenSymbol === '') {
      response("error", "Token Symbol should not be empty!");
      return;
    }
    if (cleanAmount === 0 || cleanAmount === '0' || cleanAmount === '') {
      response("error", "Input token amount to be minted!");
      return;
    }

    let details = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      wallet: address,
      TokenAmount: tokenAmount
    };
    for (let key in details) {
      formData.append(key, details[key]);
    }

    await axios.post(`${process.env.REACT_APP_API_HTTP}google_captcha`, {
      token: token
    }).then(async (res) => {

      if (!res.data) {
        captchaRef.current.reset();
        response("error", "Please check captcha first");
        return;
      }

      try {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }, onUploadProgress: ProgressEvent => {
            setProgress(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)));
            setTimeout(() => setProgress(0), 2500);
          }
        };
        const res = await axios.post(`${process.env.REACT_APP_API_HTTP}token`, formData, config, {
          //
        });
        const { fileName, filePath } = res.data;
        setuploadedFile({ fileName, filePath });
        sweetAlertEffect('success', 'Executed successfully');
        setTimeout(() => window.location.reload(), 5000);

      } catch (err) {
        if (err.response.status === 500) {
          response("error", "There was a problem with the server");
        } else {
          response("error", err.response.data.msg);
        }
      }
    });
  };

  function sweetAlertEffect(type, message) {
    return (
      <>{Swal.fire({ toast: true, position: 'center', icon: type, text: message, showConfirmButton: false, timer: 5000, width: '320' })}</>
    );
  }

  return (
    <Fragment>
      <div className="gio_creation_label">
        {/*<h4 className='login-resources'>-------Governance Token Creation-------</h4>*/}
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleTokenName} maxLength={15} type="text" name="name" placeholder="Token Name" required />
              <i className="fas fa-donate"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleTokenSymbol} maxLength={5} type="text" name="desc" placeholder="Token Symbol" required />
              <i className="fas fa-file-signature"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              {/*<input onChange={handleTokenAmount} type="number" name="amount" placeholder="Token Mint Amount" required />*/}
              <NumericFormat onChange={handleTokenAmount} value="" allowLeadingZeros thousandSeparator="," placeholder="Token Mint Amount" required />
              <i className="fas fa-coins"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input type="file" id="choose-file" name="img" className="choose" accept="image/x-png,image/gif,image/jpeg" onChange={onChange} required />
              <i className="fas fa-image"></i>
              <span id="gio_file_label"><small>Upload Token Logo</small></span>
            </div>
          </div>
          <Progress percetage={progress} />
          {uploadedFile ? (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="company_profile_info">
                <div id="img-preview" className="company-up-info">
                  {/*<img src={uploadedFile.filePath} alt="" />*/}
                  <img src="/assets/images/blank_img.png" alt="" />
                </div>
                {/*<a href="#" title="" className="view-more-pro">{uploadedFile.fileName}</a>*/}
                <a id="img-name" className="view-more-pro">No Image Selected</a>
              </div>
            </div>
          ) : null}
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} className="g-recaptcha" />
          <div className="col-lg-12 no-pdd gio_create_button row">
            <button disabled={isClicked} type="submit" value="submit">{isClicked ? load : save}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
