FROM python:3.7

MAINTAINER Anand Pawara <anandpawara19@gmail.com>

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install gcc make \
    && rm -rf /var/lib/apt/list/*


RUN pip install --no-cache-dir --upgrade pip

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN rm -rf /src/env


EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["app.py"]

