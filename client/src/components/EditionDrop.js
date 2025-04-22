import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import Progress from './Progress';
import Swal from 'sweetalert2';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import ReCAPTCHA from "react-google-recaptcha";

export const EditionDrop = () => {

  const captchaRef = useRef(null);
  const address = useAddress();
  const [file, setFile] = useState('');
  const [uploadedFile, setuploadedFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [dropName, setDropName] = useState('');
  const [dropDesc, setDropDesc] = useState('');
  const [siteConfig, setSiteConfig] = useState([]);
  const [validation, setValidation] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isAdminm, setIsAdmin] = useState(false);

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
      axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
      }).then((response) => {
        setSiteConfig(response.data);
      });
    } catch (err) {
      toastEffect("error", "Code: 101987");
    }
  }, [address]);

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
      toastEffect("error", "Code: 101988");
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
      toastEffect("error", "Code: 101989");
    }
  }, [file]);

  const handleDropName = event => {
    setDropName(event.target.value);
  };
  const handleDropDesc = event => {
    setDropDesc(event.target.value);
  };

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  function makeid() {
    const dateNow = toTimestamp(Date().toLocaleString());
    var text = "";
    var possible = "abcdef0123456789" + dateNow.toString();

    for (var i = 0; i < 50; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return "ea101919" + text + "101919";
  }

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
    const editionDropName = dropName;
    const editionDropDesc = dropDesc;
    const token = captchaRef.current.getValue();
    //captchaRef.current.reset();
    setIsClicked(true);
    setValidation(true);

    const generatedPkey = makeid();

    const provider = new ethers.providers.JsonRpcProvider(siteConfig[0].ImREAL_RPC);
    const wallet = new ethers.Wallet(generatedPkey, provider);
    const sdk = new ThirdwebSDK(wallet);

    const _address = await sdk.getSigner().getAddress();

    if (!address || !isAdminm) {
      return;
    }
    if (editionDropName === '') {
      response("error", "Edition Drop name should not be empty!");
      return;
    }
    if (editionDropDesc === '') {
      response("error", "Edition Drop Description should not be empty!");
      return;
    }

    let details = {
      privatekey: generatedPkey,
      dropname: editionDropName,
      dropdesc: editionDropDesc,
      wallet: address,
      sdk_wallet: _address,
      validation: validation
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
        const res = await axios.post(`${process.env.REACT_APP_API_HTTP}upload`, formData, config, {
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
        {/*<h4 className='login-resources'>-------Edition Drop Creation-------</h4>*/}
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleDropName} type="text" name="name" placeholder="Edition Drop Name" required />
              <i className="fas fa-tint"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleDropDesc} type="text" name="desc" placeholder="Edition Drop Description" required />
              <i className="fas fa-file-signature"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input type="file" id="choose-file" name="img" className="choose" accept="image/x-png,image/gif,image/jpeg" onChange={onChange} required />
              <i className="fas fa-image"></i>
              <span id="gio_file_label"><small>Upload your Logo</small></span>
            </div>
          </div>
          <Progress percetage={progress} />
          {uploadedFile ? (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="company_profile_info">
                <div id="img-preview" className="company-up-info">
                  <img src="/assets/images/blank_img.png" alt="" />
                </div>
                <a id="img-name" className="view-more-pro">No Image Selected</a>
              </div>
            </div>
          ) : null}
          <div className="col-lg-12 no-pdd gio_create_button">
            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} className="g-recaptcha" />
            <button disabled={isClicked} type="submit" value="submit">{isClicked ? load : save}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
