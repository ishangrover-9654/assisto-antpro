import { message } from 'antd';
import { submitMedicalForm } from './service';

const Model = {
  namespace: 'medicalForm',
  state: {},
  effects: {
    *submitRegularForm({ payload }, { call }) {
      //console.log('payload issue:');
      //console.log(payload.issues);
      /*const categories = [];
      payload.issues.forEach((value) => {
        //const item = { name: value };
        const item = JSON.parse(value);
        categories.push(item);
      });
      payload.issues = categories;

      console.log('payload issue 2:');
      console.log(payload.issues);
      // payload.issues =*/
      yield call(submitMedicalForm, payload);
      message.success('Medical Record Created');
    },
  },
};
export default Model;
