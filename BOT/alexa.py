import speech_recognition as sr
import pyttsx3
import pywhatkit
import datetime
import wikipedia

# Nombre del Asistente
name = "juandi"

listener = sr.Recognizer()

engine = pyttsx3.init()

''' Voz del asistente '''
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

''' engine.say("¿Qué necesitas?")
engine.runAndWait() '''

def talk(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    try:
        with sr.Microphone() as source:
            print("Escuchando...")
            voice = listener.listen(source)
            rec = listener.recognize_google(voice)
            rec = rec.lower()
            if name in rec:
                rec = rec.replace(name, "")
                print(rec)
            
    except:
        pass
    return rec

def run():
    rec = listen()
    if "youtube" in rec:
        music = rec.replace("youtube", "")
        talk("Reproduciendo" + music)
        pywhatkit.playonyt(music)
    elif 'hora' in rec:
        hora = datetime.datetime.now().strftime('%I:%M %p')
        talk("Son las " + hora)
    elif 'busca' in rec:
        order = rec.replace('busca', '')
        wikipedia.set_lang("es")
        info = wikipedia.summary(order, 1)
        talk(info)
    else :
        talk("No entiendo")

while True:
    run()
    