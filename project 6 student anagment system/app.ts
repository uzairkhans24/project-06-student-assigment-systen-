#!/usr/bin/env node


import * as readline from 'readline';

interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
}

class StudentManagementSystem {
    private students: Student[] = [];
    private currentId: number = 1;

    addStudent(name: string, age: number, grade: string): void {
        const student: Student = {
            id: this.currentId++,
            name,
            age,
            grade
        };
        this.students.push(student);
        console.log('Student added successfully.');
    }

    viewStudents(): void {
        console.log('Student List:');
        this.students.forEach(student => {
            console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
        });
    }

    updateStudent(id: number, name: string, age: number, grade: string): void {
        const student = this.students.find(s => s.id === id);
        if (student) {
            student.name = name;
            student.age = age;
            student.grade = grade;
            console.log('Student updated successfully.');
        } else {
            console.log('Student not found.');
        }
    }

    deleteStudent(id: number): void {
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

function mainMenu(): void {
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

