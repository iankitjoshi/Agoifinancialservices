import { apiPost } from '../../utils/axios';

export function loginAPI(data) {
  return apiPost('/auth/login', data);
}

export function logoutAPI() {
  return apiPost('/logout');
}


export function forgotPasswordAPI(data) {
  let formData = new FormData();
  formData.append('email', data.email);
}

export function resetPasswordAPI(data) {
  let formData = new FormData();
  formData.append('password', data.password);
  formData.append('confirm_password', data.confirmPassword);
  formData.append('resent_toker', data.tokenId);
}

