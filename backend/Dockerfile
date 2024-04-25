FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

# Copie apenas os arquivos essenciais
COPY database database
COPY config.py .
COPY routes.py .
COPY app.py .
COPY models.py .
COPY controllers.py .

# Execute os comandos para inicializar e migrar o banco de dados
RUN flask db init
RUN flask db migrate -m "Initial migration"
RUN flask db upgrade

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
