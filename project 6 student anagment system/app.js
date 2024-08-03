#!/usr/bin/env node
import * as readline from 'readline';
class StudentManagementSystem {
    students = [];
    currentId = 1;
    addStudent(name, age, grade) {
        const student = {
            id: this.currentId++,
            name,
            age,
            grade
        };
        this.students.push(student);
        console.log('Student added successfully.');
    }
    viewStudents() {
        console.log('Student List:');
        this.students.forEach(student => {
            console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
        });
    }
    updateStudent(id, name, age, grade) {
        const student = this.students.find(s => s.id === id);
        if (student) {
            student.name = name;
            student.age = age;
            student.grade = grade;
            console.log('Student updated successfully.');
        }
        else {
            console.log('Student not found.');
        }
    }
    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        console.log('Student deleted successfully.');
    }
}
// Setup readline interface to read from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const system = new StudentManagementSystem();
function mainMenu() {
    console.log(`
        1. Add Student
        2. View Students
        3. Update Student
        4. Delete Student
        5. Exit
    `);
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter name: ', (name) => {
                    rl.question('Enter age: ', (age) => {
                        rl.question('Enter grade: ', (grade) => {
                            system.addStudent(name, parseInt(age), grade);
                            mainMenu();
                        });
                    });
                });
                break;
            case '2':
                system.viewStudents();
                mainMenu();
                break;
            case '3':
                rl.question('Enter student ID to update: ', (id) => {
                    rl.question('Enter new name: ', (name) => {
                        rl.question('Enter new age: ', (age) => {
                            rl.question('Enter new grade: ', (grade) => {
                                system.updateStudent(parseInt(id), name, parseInt(age), grade);
                                mainMenu();
                            });
                        });
                    });
                });
                break;
            case '4':
                rl.question('Enter student ID to delete: ', (id) => {
                    system.deleteStudent(parseInt(id));
                    mainMenu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option.');
                mainMenu();
                break;
        }
    });
}
mainMenu();
