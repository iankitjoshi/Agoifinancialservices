import { apiPost } from '../../utils/axios';

export function loginAPI(data) {
  const user = {}
  user.email = data.email
  user.password = data.password
  return apiPost('/admin/login', user);
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

