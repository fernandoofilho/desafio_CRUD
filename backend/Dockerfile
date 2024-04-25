FROM python:3.10

WORKDIR /app

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
RUN rm -rf migrations/ proj_indt/

EXPOSE 5000

CMD python ./app.py
# RUN flask db init 
# RUN flask db migrate 

# EXPOSE 5000

# CMD ["python3", "app.py"]