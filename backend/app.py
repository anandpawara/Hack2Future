import os
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

import cv2
from matplotlib import pyplot as plt
from PIL import Image
import numpy as np
import os
import pickle
import io
import base64
from kyc import detector
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './uploads' 
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
image_path = "test_image/test_image.jpg"
app = Flask(__name__)

adhar_folder = "adhar/"
id_folder = "id_folder/"
# sess = Sess
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER





def get_image(image_path):
    img = Image.open(image_path, mode='r')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr,format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
     


@app.route("/")
def hello_world():
    return "Hello World"


@app.route('/print_filename',methods=['POST','PUT'])
def print_filename():
    file = request.files['file']
    filename=secure_filename(file.filename)
    return jsonify({"result:":filename})


@app.route('/upload', methods=['POST'])
def fileUpload():
    # target=os.path.join(UPLOAD_FOLDER,'test_docs')
    # if not os.path.isdir(target):
    #     os.mkdir(target)

    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([UPLOAD_FOLDER, filename])
    file.save(destination)
    # session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return "TESt"


# file_path = "test_images\GBAadhar.jpg"
# face_path = "test_images\GB_org.jpg"
@app.route('/compare_face',methods=['POST','GET'])
def analyse():
    adhar_pic = Image.open(request.files['adhar_pic'])
    id_pic = Image.open(request.files['id_pic'])

    res=detector()
    result = res.detection(adhar_pic,id_pic)
    print(result)
    return "True"

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    # app.secret_key = "dfsdffsfwerewrs"
    # app.config['SESSION_TYPE'] = 'filesystem'
    # sess.init_app(app)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

CORS(app, expose_headers='Authorization')
