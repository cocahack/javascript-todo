'use strict';

class Task {
  constructor(title, state) {
    this.title = title;
    this.state = state;
  }
}

const todoApp = {
  taskList: [],
  stateList: ['todo', 'doing', 'done'],

  command(cmdStr) {
    const parsedCmd = this.parseCmdStr(cmdStr);

    switch (parsedCmd[0]) {
      case 'add':
        const taskId = this.addTask(parsedCmd[1]);
        console.log(`\n>> id : ${taskId}, "${parsedCmd[1]}" 항목이 새로 추가됐습니다.`);

        const stateStatistic = this.getStateStatistic();
        this.showStateStatistic(stateStatistic);
        break;
      case 'show':
        this.showTasksByState(parsedCmd[1]);
        break;
    }
  },
  parseCmdStr(cmdStr) {
    return cmdStr.split('$');
  },
  addTask(taskName) {
    const taskId = this.taskList.push(new Task(taskName, this.stateList[0]));
    return taskId;
  },
  getStateStatistic() {
    const stateStatistic = this.stateList.reduce((resultObj, state) => {
      resultObj[state] = 0;
      return resultObj;
    }, {});

    this.taskList.forEach(task => {
      if (task.state in stateStatistic) stateStatistic[task.state]++;
    });
    return stateStatistic;
  },
  showStateStatistic(stateStatistic) {
    let stateStatisticMsg = '';

    stateStatisticMsg += `>> 현재 상태 : `;
    for (let state in stateStatistic) {
      stateStatisticMsg += `${state}(${stateStatistic[state]}개), `;
    }

    console.log(stateStatisticMsg.slice(0, -2));
  },
  showTasksByState(state) {
    let resultMsg = this.taskList.reduce((msg, task, taskIdx) => {
      if (state === task.state) {
        return msg + `"${taskIdx + 1}, ${task.title}", `
      }
    }, '');

    if (!resultMsg) resultMsg = `[${state}]에 해당하는 값이 없습니다.`;
    else resultMsg = resultMsg.slice(0, -2);

    console.log(`\n>> ${resultMsg}`);
  }
}

todoApp.command('add$자바스크립트 공부');
todoApp.command('add$알고리즘 공부');
todoApp.command('show$todo');