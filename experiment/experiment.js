const jsPsych = initJsPsych({
    show_progress_bar: true,
    override_safe_mode: true,
    on_finish: function(data) {
        proliferate.submit({"trials": data.trials});
    }
  }
);

let timeline = []; //Empty timeline

var trial_1 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'Describe an autistic person.', name: 'Person', rows: 5},
  ]
};

var trial_2 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'What does an autistic person sound like?', name: 'Sound', rows: 5},
  ]
};

var trial_3 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'Do you know anyone who is autistic?', name: 'Know', rows: 5}
  ]
};

timeline.push(trial_1, trial_2, trial_3);

//RUN//
jsPsych.run(timeline);