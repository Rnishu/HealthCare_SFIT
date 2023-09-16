from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
import json
import joblib
import numpy as np
import sklearn
import tensorflow as tf
import keras
from keras import saving
import xgboost
import pandas as pd

y_in=pd.read_csv('../downloads/output_ff.csv')
y=np.array(y_in).flatten()
label_encoder=LabelEncoder()
label_encoder.fit(y)

input=[]
for i in range(404):
    input.append(0)
input[22]=1
input[56]=1
print(input)

app = Flask(__name__)

DiseaseList=["Alzheimer's disease", 'HIV', 'Pneumocystis carinii pneumonia',
       'accident cerebrovascular', 'acquired immuno-deficiency syndrome',
       'adenocarcinoma', 'adhesion', 'affect labile', 'anemia',
       'anxiety state', 'aphasia', 'arthritis', 'asthma', 'bacteremia',
       'benign prostatic hypertrophy', 'biliary calculus',
       'bipolar disorder', 'bronchitis', 'candidiasis', 'carcinoma',
       'carcinoma breast', 'carcinoma colon', 'carcinoma of lung',
       'carcinoma prostate', 'cardiomyopathy', 'cellulitis',
       'cholecystitis', 'cholelithiasis',
       'chronic alcoholic intoxication', 'chronic kidney failure',
       'chronic obstructive airway disease', 'cirrhosis', 'colitis',
       'confusion', 'coronary arteriosclerosis', 'coronary heart disease',
       'decubitus ulcer', 'deep vein thrombosis',
       'degenerative polyarthritis', 'deglutition disorder',
       'dehydration', 'delirium', 'delusion', 'dementia', 'dependence',
       'depression mental', 'depressive disorder', 'diabetes',
       'diverticulitis', 'diverticulosis', 'edema pulmonary',
       'effusion pericardial', 'embolism pulmonary',
       'emphysema pulmonary', 'encephalopathy', 'endocarditis',
       'epilepsy', 'exanthema', 'failure heart',
       'failure heart congestive', 'failure kidney', 'fibroid tumor',
       'gastritis', 'gastroenteritis', 'gastroesophageal reflux disease',
       'glaucoma', 'gout', 'hemiparesis', 'hemorrhoids', 'hepatitis',
       'hepatitis B', 'hepatitis C', 'hernia', 'hernia hiatal',
       'hiv infections', 'hyperbilirubinemia', 'hypercholesterolemia',
       'hyperglycemia', 'hyperlipidemia', 'hypertension pulmonary',
       'hypertensive disease', 'hypoglycemia', 'hypothyroidism', 'ileus',
       'incontinence', 'infection', 'infection urinary tract',
       'influenza', 'insufficiency renal', 'ischemia',
       'ketoacidosis diabetic', 'kidney disease', 'kidney failure acute',
       'lymphatic diseases', 'lymphoma', 'malignant neoplasm of breast',
       'malignant neoplasm of lung', 'malignant neoplasm of prostate',
       'malignant neoplasms', 'malignant tumor of colon',
       'manic disorder', 'melanoma', 'migraine disorders',
       'mitral valve insufficiency', 'myocardial infarction', 'neoplasm',
       'neoplasm metastasis', 'neuropathy', 'neutropenia', 'obesity',
       'obesity morbid', 'oral candidiasis', 'osteomyelitis',
       'osteoporosis', 'overload fluid', 'pancreatitis', 'pancytopenia',
       'paranoia', 'parkinson disease', 'paroxysmal dyspnea',
       'pericardial effusion body substance',
       'peripheral vascular disease', 'personality disorder', 'pneumonia',
       'pneumonia aspiration', 'pneumothorax',
       'primary carcinoma of the liver cells',
       'primary malignant neoplasm', 'psychotic disorder',
       'pyelonephritis', 'respiratory failure', 'schizophrenia',
       'sepsis (invertebrate)', 'septicemia', 'sickle cell anemia',
       'spasm bronchial', 'stenosis aortic valve', 'suicide attempt',
       'systemic infection', 'tachycardia sinus', 'thrombocytopaenia',
       'thrombus', 'tonic-clonic epilepsy', 'tonic-clonic seizures',
       'transient ischemic attack', 'tricuspid valve insufficiency',
       'ulcer peptic', 'upper respiratory infection']

model_severity=joblib.load('../downloads/vitalsigns_integration_b.pkl')
model_disease=joblib.load('../downloads/disease_model_integration_latest.pkl')
prediction_severity=model_severity.predict([[90,85,110,156,95]])
pred=label_encoder.inverse_transform(prediction_severity)
print(1-pred[0])


@app.route('/predict', methods=['POST'])
def predict():
    predictionDisease = model_disease.predict([request.json["symptoms"]])
    prediction_disease=DiseaseList[predictionDisease[0]]
    
    prediction=model_severity.predict([request.json["vitals"]])
    pred=label_encoder.inverse_transform(prediction)
    prediction_severity=1-pred[0]
    
    return jsonify({"disease":prediction_disease,"severity":prediction_severity})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)