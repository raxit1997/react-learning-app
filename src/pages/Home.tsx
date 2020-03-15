import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import ReactDom from 'react-dom';
import ExploreContainer from '../components/ExploreContainer';
import Employee from '../components/Employee';
import './Home.css';
import * as request from 'request';

class Home extends React.Component {

  fetchEmployeesData() {
    request.get('http://dummy.restapiexample.com/api/v1/employees', (error, response, body) => {
      const responseData = JSON.parse(body);
      const employeesData = responseData.data;
      const employeesDataElement = document.getElementsByClassName('employees-data')[0];
      ReactDom.render(<Employee employeesData={employeesData} />, employeesDataElement);
    })
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonButton onClick={() => this.fetchEmployeesData()}>
            Submit
            </IonButton>
          <ExploreContainer />
          <div className="employees-data"></div>
        </IonContent>
      </IonPage>
    );
  }

};

export default Home;
