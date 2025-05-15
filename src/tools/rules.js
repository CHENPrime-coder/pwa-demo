export default {
    required: value => !!value || '字段为必填项.',
    phone: value => {
        const reg = /^1[3-9]\d{9}$/;
        return reg.test(value) || '请输入有效的手机号码.';
    },
};