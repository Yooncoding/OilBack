import nodemailer from "nodemailer";
import config from "../../config";

const generateKey = function () {
  return Math.random().toString().substr(2, 6);
};

const transporter = nodemailer.createTransport(config.mailOption);

const sendKeyByEmail = async function (email, key) {
  await transporter.sendMail({
    from: "오늘의 일기 인증관리자",
    to: email,
    subject: "[오늘의 일기] 회원가입을 위한 이메일 인증번호입니다.",
    html: `
    <p style='color:black'>회원 가입을 위한 인증번호 입니다.</p>
    <p style='color:black'>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p>
    <h2>${key}</h2>
    `,
  });
};

export { generateKey, sendKeyByEmail };
