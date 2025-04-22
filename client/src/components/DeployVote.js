import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import Progress from './Progress';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { NumericFormat } from 'react-number-format';

export const DeployVote = () => {

  const captchaRef = useRef(null);
  const address = useAddress();
  const [value, setValue] = useState(50);
  const [quorum, setQuorum] = useState(50);
  const [tokenVal, setTokenVal] = useState(0);
  const [voteName, setVoteName] = useState('');
  const [voteDelay, setVoteDelay] = useState(0);
  const [votePeriod, setVotePeriod] = useState(0);
  const [voteQuorum, setVoteQuorum] = useState(0);
  const [tokenThreshhold, setTokenThreshhold] = useState("0");
  const [siteKey, setSiteKey] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setuploadedFile] = useState({});
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

  //const _number = parseInt(tokenVal) / 100 * value;
  const _number = parseInt(tokenVal) / 100 * (100 - quorum);
  const formatAmount = _number.toLocaleString();

  const threshHoldVal = parseInt(tokenVal) / 100 * quorum;
  const formatthreshHoldVal = threshHoldVal.toLocaleString();

  useEffect(() => {
    try {
      const getData = () => {
        axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
        }).then((response) => {
          setSiteKey(response.data[0].recaptcha_site_key);
        });

        axios.post(`${process.env.REACT_APP_API_HTTP}get_creation`, {
          wallet: address
        }).then((response) => {
          setTokenVal(response.data[0].token_amount);
        });
      };
      getData();
    } catch (err) {
      toastEffect("error", "Code: 101990");
    }
  }, [siteKey, tokenVal]);

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
      toastEffect("error", "Code: 101991");
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
      toastEffect("error", "Code: 101992");
    }
  }, [file]);

  const handleVoteName = event => {
    setVoteName(event.target.value);
  };
  const handleVoteDelay = event => {
    setVoteDelay(event.target.value);
  };
  const handleVotePeriod = event => {
    setVotePeriod(event.target.value);
  };
  const handleTokenThreshhold = event => {
    setTokenThreshhold(event.target.value);
  };
  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const min = 1;
  const max = 100;

  const handleVoteQuorum = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setQuorum(value);
    setVoteQuorum(value);
  };

  const handleTokenTransfer = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
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
    var convertedTokenThreshhold = tokenThreshhold.replace(/,/g, "");
    const _voteName = voteName;
    const _voteDelay = voteDelay;
    const _votePeriod = votePeriod;
    const _voteQuorum = voteQuorum;
    const _tokenThreshhold = convertedTokenThreshhold;
    const _tokenTransfer = _number;
    const token = captchaRef.current.getValue();
    setIsClicked(true);

    if (!address || !isAdmin) {
      return;
    }
    if (_voteName === '') {
      response("error", "DAO name should not be empty!");
      return;
    }
    if (_voteDelay === '') {
      response("error", "Voting delay is empty!");
      return;
    }
    if (_votePeriod === '') {
      response("error", "Voting Period is empty!");
      return;
    }
    if (_voteQuorum === '') {
      response("error", "Voting Quorum is empty!");
      return;
    }
    const calQuorum = parseInt(tokenVal) / 100 * quorum;
    if (convertedTokenThreshhold > calQuorum) {
      response("error", "Token Threshold should not be greater than the Quorum Token value!");
      return;
    }
    if (convertedTokenThreshhold === 0 || convertedTokenThreshhold === '0' || convertedTokenThreshhold === '') {
      response("error", "Token Threshhold is invalid!");
      return;
    }

    let details = {
      wallet: address,
      voteName: _voteName,
      voteDelay: _voteDelay,
      votePeriod: _votePeriod,
      voteQuorum: _voteQuorum,
      tokenThreshhold: _tokenThreshhold,
      tokenTransfer: _tokenTransfer
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
        const res = await axios.post(`${process.env.REACT_APP_API_HTTP}vote`, formData, config, {
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
        {/*<h4 className='login-resources'>-------Voting Contract Creation-------</h4>*/}
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleVoteName} type="text" name="name" placeholder="DAO Name" required />
              <i className="fas fa-vote-yea"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleVoteDelay} type="number" name="delay" placeholder="Voting Delay (By Blocks)" required />
              <i className="fas fa-hourglass-half"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleVotePeriod} type="number" name="period" placeholder="Voting Period (By Blocks)" required />
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <NumericFormat onChange={handleTokenThreshhold} value="" name="threshold" allowLeadingZeros thousandSeparator="," placeholder="Token Threshold (By Amount)" required />
              <i className="fas fa-sliders-h"></i>
            </div>
          </div>
          <div className="gio_creation_label">
            <h4 className='login-resources'>Voting Quorum (By Token %)</h4>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input value={quorum} onChange={handleVoteQuorum} type="number" name="quorum" placeholder="Voting Quorum (By Token %)" required />
              <i className="fas fa-percentage"></i>
              <span id="gio_info" className="gio_info" title="Current minted token">{formatthreshHoldVal}</span>
            </div>
          </div>
          <div className="gio_creation_label">
            <h4 className='login-resources'>Amount to be transferred (By Token %)</h4>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              {/*<input value={value} onChange={handleTokenTransfer} type="number" name="Token Amount" placeholder="Token Amount" required />*/}
              <input value={100 - quorum} onChange={handleTokenTransfer} type="number" name="Token Amount" placeholder="Token Amount" readOnly />
              <i className="fas fa-coins"></i>
              <span id="gio_info" className="gio_info" title="Current minted token">{formatAmount}</span>
            </div>
          </div>
          <div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input type="file" id="choose-file" name="img" className="choose" accept="image/x-png,image/gif,image/jpeg" onChange={onChange} required />
              <i className="fas fa-image"></i>
              <span id="gio_file_label"><small>Upload DAO Logo</small></span>
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
          {/*<reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} className="g-recaptcha" />*/}
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
          <div className="col-lg-12 no-pdd gio_create_button row">
            <button disabled={isClicked} type="submit" value="submit">{isClicked ? load : save}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
