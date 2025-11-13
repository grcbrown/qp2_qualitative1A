const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
        jsPsych.data.displayData('csv');
  }
});

let timeline = []; //Empty timeline

//IRB 
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
            <img src="./image/SUSig_2color_Stree_Left.png" alt="Stanford Logo" style="max-width: 500px; margin-bottom: 20px;">
            <h3>DESCRIPTION</h3>
            <p>You are invited to participate in a research study. It’s general purpose is to understand what associations people hold with Autism Spectrum Condition. In this study, we will ask you a four questions about your broad impressions of Autism. Following this, you will be asked to complete an optional demographic survey. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>
            <h3>TIME INVOLVEMENT</h3> 
            <p>Your participation will take approximately 4 minutes.</p>
            <h3>PAYMENT</h3> 
            <p>You will be paid at the posted rate.</p>
            <h3>PRIVACY AND CONFIDENTIALITY</h3> 
            <p>The risks associated with this study are minimal. This judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>
            <h3>CONTACT INFORMATION</h3>
            <p>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director, Grace Brown, at (616) 498-8188. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650) 723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306 USA.</p> 
            <h3>WAIVER OF DOCUMENTATION</h3>
            <p>If you agree to participate in this research, please click the 'Continue' button.</p>
        </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true,
    margin_vertical: '10px'
};

timeline.push(irb);

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
    {prompt: 'List 5-10 words that come to mind when you think of an autistic person. <br> Separate your list items with a comma.', 
    name: 'Person', 
    rows: 5,
    required: true},
  ],
  data: {
        question_type: "person"
      }
};

var trial_2 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'List 5-10 words that come to mind when you think of how an autistic person behaves. <br> Separate your list items with a comma.', 
    name: 'Behavior', 
    rows: 5,
    required: true},
  ], 
  data: {
        question_type: "behavior"
      }
};

var trial_3 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'List 5-10 words that describe what an autistic person sounds like. <br> Separate your list items with a comma.', 
    name: 'Sound', 
    rows: 5,
    required: true},
  ],
  data: {
        question_type: "sound"
      }
};

var trial_4 = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'Do you know anyone who is autistic? <br> <i>Please do not provide any identifying information in your response.</i>', 
    name: 'Know', 
    rows: 5,
    required: true}
  ],
  data: {
        question_type: "know"
      }
};

timeline.push(trial_1, trial_2, trial_3, trial_4);

//SURVEY INSTRUCTIONS
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Thank you for providing your impressions of autism. You will now be directed to an optional demographic survey. Please answer the survey questions if you feel comfortable doing so. After seeing the survey, you will be able to end the study.</p>",
    choices: ['Continue']
};

timeline.push(transition);

//SURVEY
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

//DATA COLLECTION
// capture info from Prolific
var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    subject_id: subject_id,
    study_id: study_id,
    session_id: session_id
});

const p_id = jsPsych.randomization.randomID(10);
const filename = `${p_id}.csv`;


const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "IZtniyQHNo0u",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
};

timeline.push(save_data);

//THANKS//
var thanks = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the study. Thank you for your time!</p>
    <p><a href="https://app.prolific.com/submissions/complete?cc=C1H3NC6F">Click here to return to Prolific and complete the study</a>.</p>`,
  choices: "NO_KEYS"
}

timeline.push(thanks);

//RUN//
jsPsych.run(timeline);