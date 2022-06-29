import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
  place: 'bottomRight',
  duration: 3,
  maxCount: 1,
  closable: true
})

export default toast