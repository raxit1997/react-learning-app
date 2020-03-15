import React from 'react';

export class Employee extends React.Component {

    constructor(public props: any, private employeesData: Array<any>) {
        super(props);
        if (this.props && this.props.employeesData) {
            this.employeesData = this.props.employeesData;
        }
    }

    render() {
        if (this.employeesData && this.employeesData.length > 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.employeesData.map((employeeData: any) => {
                                return (
                                    <tr>
                                        <td>{employeeData.employee_name}</td>
                                        <td>{employeeData.employee_salary}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        } else {
            return (
                <p>Employee data not found</p>
            )
        }
    }

}

export default Employee;
