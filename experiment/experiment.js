const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
    }
  }
);

let timeline = []; //Empty timeline


//INSTRUCTIONS
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Autism has received increased public attention in recent years, leading to a wide range of discussions about what it means to be autistic. To better understand how people in the United States think and talk about autism, we will ask you four short questions about your general impressions of the condition. Following this, you have the opportunity to complete an optional demographic survey. Your responses will help us learn more about how autism is perceived and discussed in everyday life.<br><br>If you understand the instructions and are ready to begin, click ‘Continue’.</p>",
    choices: ['Continue']
};

timeline.push(instructions);

//SURVEY QUESTIONS
var trial_1 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'List 5-10 words that come to mind when you think of an autistic person.', 
    name: 'Person', 
    rows: 5,
    required: true},
  ]
};

var trial_2 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'List 5-10 words that come to mind when you think of how an autistic person behaves.', 
    name: 'Person', 
    rows: 5,
    required: true},
  ]
};

var trial_3 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'List 5-10 words that describe what an autistic person sounds like.', 
    name: 'Sound', 
    rows: 5,
    required: true},
  ]
};

var trial_4 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'Do you know anyone who is autistic?', 
    name: 'Know', 
    rows: 5,
    required: true}
  ]
};

timeline.push(trial_1, trial_2, trial_3, trial_4);

//INSTRUCTIONS
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Thank you for providing your impressions of autism. You will now be directed to an optional demographic survey. Please answer the survey questions if you feel comfortable doing so. After seeing the survey, you will be able to end the study.</p>",
    choices: ['Continue']
};

timeline.push(transition);

const questionnaire = {
  type: jsPsychSurvey,
  theme: "modern",
  survey_json: {
    showQuestionNumbers: "off",
    widthMode: "responsive",
    completeText: "Finish",
    elements: [
      {
        type: "html",
        html: "<p>Please respond to the following questions if you are comfortable doing so. If you'd like to skip to the end of the experiment, click 'Finish' at the bottom of the page.</p>"
      },
      {
        type: "boolean",
        name: "understood",
        title: "Did you read and understand the instructions?",
        labelTrue: "Yes",
        labelFalse: "No",
        renderAs: "radio"
      },
      {
        type: "text",
        name: "age",
        title: "Age:",
        inputType: "number"
      },
      {
        type: "radiogroup",
        name: "gender",
        title: "What is your gender identity?",
        choices: ["Male", "Female", "Non-binary", "Prefer not to answer"],
        showOtherItem: true,
        otherText: "Other (describe)"
      },
      {
        type: "comment",
        name: "ethnicity",
        title: "What is your race and/or ethnicity?"
      },
      {
        type: "radiogroup",
        name: "enjoy",
        title: 'Did you enjoy this study?',
        choices: [
          "Worse than average study",
          "Average study",
          "Better than average study"
        ]
      },
      {
        type: "radiogroup",
        name: "payment",
        title: "Do you think the payment was fair?",
        choices: [
          "The payment was fair",
          "The payment was too low"
        ]
      },
      {
        type: "comment",
        name: "comments",
        title: "Do you have any additional comments about this study?"
      }
    ]
  }
};

timeline.push(questionnaire);

//THANKS//
const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['End'],
    stimulus: "Thank you for your time! Please click 'End' to complete the study and wait until you are redirected to Prolific."
};

timeline.push(thanks);

//RUN//
jsPsych.run(timeline);