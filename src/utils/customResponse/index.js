const responseDto = ({ suc, mes = "", data = null }) => ({ success: suc, message: mes, data });

export default responseDto;
