import { Situation } from './types';

export const INITIAL_SITUATIONS: Situation[] = [
  {
    id: 'sit_1',
    category: 'Restaurante',
    categoryHy: 'Ռեստորան',
    level: 'A1',
    questionEs: '¿Qué harías si el camarero trae un plato equivocado?',
    questionHy: 'Ի՞նչ կանեիր, եթե մատուցողը սխալ ուտեստ բերեր։',
    options: [
      {
        id: 'sit_1_a',
        letter: 'A',
        textEs: 'Perdón, creo que este plato no es mío.',
        textHy: 'Ներեցեք, կարծում եմ՝ սա իմ ուտեստը չէ։',
        isCorrect: true,
        whyBestEs: 'Es la forma más educada, natural y asertiva de corregir un error en un restaurante hispanohablante.',
        whyWorseEs: '',
        explanationHy: 'Սա ամենաքաղաքավարի և բնական ձևն է սխալը նշելու համար առանց կոպտության։'
      },
      {
        id: 'sit_1_b',
        letter: 'B',
        textEs: '¡Esto está muy mal!',
        textHy: 'Սա շատ վատ է։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es demasiado agresivo y directo; se considera descortés.',
        explanationHy: 'Չափազանց ագրեսիվ է և անքաղաքավարի է հնչում իսպաներենում։'
      },
      {
        id: 'sit_1_c',
        letter: 'C',
        textEs: 'No digo nada.',
        textHy: 'Ոչինչ չեմ ասում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Comerás algo que no pediste y no comunicarás tus necesidades.',
        explanationHy: 'Պասիվ մոտեցում է. դուք կուտեք այն, ինչ չեք պատվիրել։'
      },
      {
        id: 'sit_1_d',
        letter: 'D',
        textEs: 'Me voy sin pagar.',
        textHy: 'Գնում եմ առանց վճարելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es una falta de respeto e incluso ilegal sin intentar solucionar el problema.',
        explanationHy: 'Անօրինական և անհարգալից է, լուծում չէ։'
      }
    ],
    culturalNoteEs: 'En España y Latinoamérica es común usar "Disculpa" o "Perdón" antes de hacer cualquier reclamación amigable.',
    culturalNoteHy: 'Իսպանիայում և Լատինական Ամերիկայում սովորական է ասել "Disculpa" կամ "Perdón" նախքան դիտողություն անելը։'
  },
  {
    id: 'sit_2',
    category: 'Aeropuerto',
    categoryHy: 'Օդանավակայան',
    level: 'A2',
    questionEs: '¿Qué harías si pierdes el pasaporte en el aeropuerto?',
    questionHy: 'Ի՞նչ կանեիր, եթե օդանավակայանում կորցնեիր անձնագիրդ։',
    options: [
      {
        id: 'sit_2_a',
        letter: 'A',
        textEs: 'Voy inmediatamente a la oficina de objetos perdidos o al punto de información.',
        textHy: 'Անմիջապես գնում եմ կորած իրերի գրասենյակ կամ տեղեկատվական կետ։',
        isCorrect: true,
        whyBestEs: 'Es el procedimiento estándar y adecuado para localizar documentos oficiales perdidos rápidamente.',
        whyWorseEs: '',
        explanationHy: 'Ճիշտ և արագ քայլն է՝ պաշտոնական տեղեկատվական կենտրոն դիմելը։'
      },
      {
        id: 'sit_2_b',
        letter: 'B',
        textEs: 'Busco un pasaporte de otra persona.',
        textHy: 'Փնտրում եմ ուրիշի անձնագիր։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es absurdo e ilegal.',
        explanationHy: 'Անիմաստ և անօրինական է։'
      },
      {
        id: 'sit_2_c',
        letter: 'C',
        textEs: 'Lloro y espero a que alguien me lo traiga.',
        textHy: 'Լաց եմ լինում և սպասում, որ մեկը բերի այն։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'No resuelve la emergencia.',
        explanationHy: 'Պասիվ է և չի լուծի խնդիրը։'
      },
      {
        id: 'sit_2_d',
        letter: 'D',
        textEs: 'Subo al avión sin decir nada a nadie.',
        textHy: 'Նստում եմ ինքնաթիռ առանց ոչ ոքի ոչինչ ասելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Imposible, el control de seguridad y embarque te detendrá.',
        explanationHy: 'Անհնար է, անվտանգության աշխատակիցները թույլ չեն տա։'
      }
    ]
  },
  {
    id: 'sit_3',
    category: 'Banco',
    categoryHy: 'Բանկ',
    level: 'A2',
    questionEs: '¿Qué harías si tu tarjeta bancaria no funciona en el cajero?',
    questionHy: 'Ի՞նչ կանեիր, եթե բանկային քարտդ չաշխատեր բանկոմատում։',
    options: [
      {
        id: 'sit_3_a',
        letter: 'A',
        textEs: 'Golpeo la máquina para que salga la tarjeta.',
        textHy: 'Խփում եմ մեքենային, որ քարտը դուրս գա։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Puedes dañar el cajero y empeorar la situación.',
        explanationHy: 'Կարող եք վնասել բանկոմատը:'
      },
      {
        id: 'sit_3_b',
        letter: 'B',
        textEs: 'Llamo al número de atención al cliente de mi banco para bloquear o revisar la tarjeta.',
        textHy: 'Զանգահարում եմ իմ բանկի աջակցման ծառայությանը քարտը ստուգելու կամ արգելափակելու համար։',
        isCorrect: true,
        whyBestEs: 'Es la solución más segura y profesional para evitar fraude y solucionar problemas técnicos.',
        whyWorseEs: '',
        explanationHy: 'Ամենաանվտանգ քայլն է՝ անմիջապես զանգահարել բանկի հաճախորդների աջակցման կենտրոն։'
      },
      {
        id: 'sit_3_c',
        letter: 'C',
        textEs: 'Le pido a un desconocido que intente meter su tarjeta.',
        textHy: 'Խնդրում եմ անծանոթին փորձել իր քարտը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'No ayuda con el problema de tu propia tarjeta.',
        explanationHy: 'Օգուտ չի տա ձեր քարտի խնդրին։'
      },
      {
        id: 'sit_3_d',
        letter: 'D',
        textEs: 'Me olvido del dinero y me voy a casa.',
        textHy: 'Մոռանում եմ փողի մասին և գնում տուն։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Perderás el control sobre tu cuenta bancaria.',
        explanationHy: 'Կորցնում եք վերահսկողությունը բանկային հաշվի նկատմամբ։'
      }
    ]
  },
  {
    id: 'sit_4',
    category: 'Tienda',
    categoryHy: 'Խանութ',
    level: 'A1',
    questionEs: '¿Qué harías si el precio al cobrar es diferente al de la etiqueta?',
    questionHy: 'Ի՞նչ կանեիր, եթե վճարման պահին գինը տարբերվեր պիտակի գնից։',
    options: [
      {
        id: 'sit_4_a',
        letter: 'A',
        textEs: 'Disculpe, en el estante ponía un precio distinto, ¿podría comprobarlo?',
        textHy: 'Ներեցեք, դարակում այլ գին էր նշված, կստուգե՞ք։',
        isCorrect: true,
        whyBestEs: 'Forma educada de reclamar tu derecho como consumidor con cortesía.',
        whyWorseEs: '',
        explanationHy: 'Քաղաքավարի և հարգալից ձևով խնդրում եք ճշտել գինը։'
      },
      {
        id: 'sit_4_b',
        letter: 'B',
        textEs: '¡Sois unos ladrones!',
        textHy: 'Դուք գող եք։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es una acusación grave y un insulto fuera de lugar.',
        explanationHy: 'Կոպիտ և վիրավորական արտահայտություն է։'
      },
      {
        id: 'sit_4_c',
        letter: 'C',
        textEs: 'Pago callado aunque sea más caro.',
        textHy: 'Լռելյայն վճարում եմ, նույնիսկ եթե ավելի թանկ է։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Pagas de más innecesariamente.',
        explanationHy: 'Ավելորդ ավել փող եք վճարում։'
      },
      {
        id: 'sit_4_d',
        letter: 'D',
        textEs: 'Dejo todo tirado en la caja y me salgo corriendo.',
        textHy: 'Ամեն ինչ թողնում եմ դրամարկղում ու փախչում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es infantil y poco práctico.',
        explanationHy: 'Մանկական և անարդյունավետ վարքագիծ է։'
      }
    ]
  },
  {
    id: 'sit_5',
    category: 'Hotel',
    categoryHy: 'Հյուրանոց',
    level: 'A2',
    questionEs: '¿Qué harías si la habitación del hotel está sucia?',
    questionHy: 'Ի՞նչ կանեիր, եթե հյուրանոցի սենյակը կեղտոտ լիներ։',
    options: [
      {
        id: 'sit_5_a',
        letter: 'A',
        textEs: 'Limpio yo mismo toda la habitación.',
        textHy: 'Ինքս եմ մաքրում ամբողջ սենյակը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es responsabilidad del servicio del hotel.',
        explanationHy: 'Սա հյուրանոցի աշխատակիցների պարտականությունն է։'
      },
      {
        id: 'sit_5_b',
        letter: 'B',
        textEs: 'Llamo a recepción y pido amablemente que la limpien o me cambien de habitación.',
        textHy: 'Զանգահարում եմ ընդունարան և քաղաքավարի խնդրում մաքրել կամ փոխել սենյակը։',
        isCorrect: true,
        whyBestEs: 'Es el protocolo formal en hotelería.',
        whyWorseEs: '',
        explanationHy: 'Ամենաճիշտ պաշտոնական մոտեցումն է հյուրանոցում։'
      },
      {
        id: 'sit_5_c',
        letter: 'C',
        textEs: 'Pongo una mala reseña sin avisar primero al personal.',
        textHy: 'Վատ կարծիք եմ գրում՝ առանց անձնակազմին զգուշացնելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'No soluciona tu estancia inmediata.',
        explanationHy: 'Տվյալ պահին ձեր հանգիստը չի հարմարավետացնի։'
      },
      {
        id: 'sit_5_d',
        letter: 'D',
        textEs: 'Duermo en el pasillo.',
        textHy: 'Քնում եմ միջանցքում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Respuesta absurda.',
        explanationHy: 'Անհեթեթ պատասխան։'
      }
    ]
  },
  {
    id: 'sit_6',
    category: 'Trabajo',
    categoryHy: 'Աշխատանք',
    level: 'B1',
    questionEs: '¿Qué harías si sabes que vas a llegar tarde al trabajo por un imprevisto?',
    questionHy: 'Ի՞նչ կանեիր, եթե իմանայիր, որ անսպասելի դեպքի պատճառով ուշանալու ես աշխատանքից։',
    options: [
      {
        id: 'sit_6_a',
        letter: 'A',
        textEs: 'Aviso con antelación a mi jefe o equipo enviando un mensaje o llamando.',
        textHy: 'Նախապես զգուշացնում եմ ղեկավարին կամ թիմին՝ նամակ ուղարկելով կամ զանգահարելով։',
        isCorrect: true,
        whyBestEs: 'Demuestra responsabilidad profesional y respeto al tiempo ajeno.',
        whyWorseEs: '',
        explanationHy: 'Ցույց է տալիս աշխատանքային պատասխանատվություն և հարգանք։'
      },
      {
        id: 'sit_6_b',
        letter: 'B',
        textEs: 'Llego sin decir nada y si me preguntan invento una historia dramática.',
        textHy: 'Գալիս եմ առանց ոչինչ ասելու, իսկ հարցնելիս դրամատիկ պատմություն հորինում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Daña tu credibilidad profesional.',
        explanationHy: 'Վնասում է ձեր վստահելիությունը։'
      },
      {
        id: 'sit_6_c',
        letter: 'C',
        textEs: 'Decido no ir a trabajar en todo el día.',
        textHy: 'Որոշում եմ ընդհանրապես չգնալ աշխատանքի այդ օրը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Puede causar el despido.',
        explanationHy: 'Կարող է հանգեցնել աշխատանքից ազատման։'
      },
      {
        id: 'sit_6_d',
        letter: 'D',
        textEs: 'Culpo al tráfico aunque me haya quedado dormido.',
        textHy: 'Մեղադրում եմ խցանումներին, նույնիսկ եթե քնած եմ մնացել։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es deshonesto.',
        explanationHy: 'Աննպատակահարմար և աննախադեպ է։'
      }
    ]
  },
  {
    id: 'sit_7',
    category: 'Universidad',
    categoryHy: 'Համալսարան',
    level: 'B1',
    questionEs: '¿Qué harías si no entiendes la explicación del profesor durante la clase?',
    questionHy: 'Ի՞նչ կանեիր, եթե դասախոսության ժամանակ չհասկանայիր դասախոսի բացատրությունը։',
    options: [
      {
        id: 'sit_7_a',
        letter: 'A',
        textEs: 'Levanto la mano y digo: "¿Podría repetirlo con un ejemplo, por favor?"',
        textHy: 'Բարձրացնում եմ ձեռքս և ասում. «Կխնդրեի կրկնել օրինակով, խնդրեմ»։',
        isCorrect: true,
        whyBestEs: 'Demuestra interés e iniciativa en el aprendizaje académico.',
        whyWorseEs: '',
        explanationHy: 'Լավագույն ձևն է ուսումնական պրոցեսում հարց տալու համար։'
      },
      {
        id: 'sit_7_b',
        letter: 'B',
        textEs: 'Me pongo a mirar las redes sociales en el móvil.',
        textHy: 'Սկսում եմ սոցիալական ցանցեր նայել հեռախոսով։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Desaprovechas la clase.',
        explanationHy: 'Կորցնում եք դասի արդյունավետությունը։'
      },
      {
        id: 'sit_7_c',
        letter: 'C',
        textEs: 'Interrumpo gritando que la explicación es mala.',
        textHy: 'Ընդհատում եմ՝ գոռալով, որ բացատրությունը վատն է։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Falta total de respeto en el aula.',
        explanationHy: 'Անհարգալից է դասախոսի նկատմամբ։'
      },
      {
        id: 'sit_7_d',
        letter: 'D',
        textEs: 'Pido a mi compañero que me haga el examen entero.',
        textHy: 'Խնդրում եմ կուրսեցուս իմ փոխարեն գրել ամբողջ քննությունը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es fraude académico.',
        explanationHy: 'Ակադեմիական խարդախություն է։'
      }
    ]
  },
  {
    id: 'sit_8',
    category: 'Autobús',
    categoryHy: 'Ավտոբուս',
    level: 'A2',
    questionEs: '¿Qué harías si alguien ocupa tu asiento reservado en el autobús?',
    questionHy: 'Ի՞նչ կանեիր, եթե որևէ մեկը զբաղեցներ ավտոբուսում ձեր ամրագրված տեղը։',
    options: [
      {
        id: 'sit_8_a',
        letter: 'A',
        textEs: 'Disculpe, creo que este es mi asiento, ¿me permite ver su billete?',
        textHy: 'Ներեցեք, կարծում եմ՝ սա իմ տեղն է, կարդյո՞ք կարող եմ տեսնել ձեր տոմսը։',
        isCorrect: true,
        whyBestEs: 'Forma tranquila y educada de verificar la numeración.',
        whyWorseEs: '',
        explanationHy: 'Հանգիստ և քաղաքավարի ձև է տեղերի համարը ճշտելու համար։'
      },
      {
        id: 'sit_8_b',
        letter: 'B',
        textEs: 'Le empujo para que se levante.',
        textHy: 'Հրում եմ նրան, որ վեր կենա։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Violencia innecesaria.',
        explanationHy: 'Անհարկի բռնություն է։'
      },
      {
        id: 'sit_8_c',
        letter: 'C',
        textEs: 'Me quedo de pie todo el viaje de 5 horas sin decir nada.',
        textHy: 'Ամբողջ 5 ժամվա ճանապարհին ոտքի վրա եմ մնում՝ առանց ոչինչ ասելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'No ejerces tu derecho.',
        explanationHy: 'Չեք օգտվում ձեր իրավունքից։'
      },
      {
        id: 'sit_8_d',
        letter: 'D',
        textEs: 'Me siento en las piernas de esa persona.',
        textHy: 'Նստում եմ այդ մարդու ծնկներին։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Inadecuado e incómodo.',
        explanationHy: 'Անհարմար և անհամապատասխան է։'
      }
    ]
  },
  {
    id: 'sit_9',
    category: 'Calle',
    categoryHy: 'Փողոց',
    level: 'A1',
    questionEs: '¿Qué harías si un turista perdido te pide ayuda en la calle?',
    questionHy: 'Ի՞նչ կանեիր, եթե փողոցում մոլորված զբոսաշրջիկը քեզ օգնություն խնդրեր։',
    options: [
      {
        id: 'sit_9_a',
        letter: 'A',
        textEs: 'Si conozco el sitio, se lo explico o se lo señalo en el mapa.',
        textHy: 'Եթե գիտեմ տեղը, բացատրում եմ կամ ցույց տալիս քարտեզի վրա։',
        isCorrect: true,
        whyBestEs: 'Es la conducta hospitalaria y amigable ideal.',
        whyWorseEs: '',
        explanationHy: 'Հյուրընկալ և բարեհամբույր մոտեցում է։'
      },
      {
        id: 'sit_9_b',
        letter: 'B',
        textEs: 'Salgo corriendo asustado.',
        textHy: 'Վախեցած փախչում եմ։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Reacción exagerada.',
        explanationHy: 'Չափազանցված արձագանք է։'
      },
      {
        id: 'sit_9_c',
        letter: 'C',
        textEs: 'Le doy indicaciones totalmente falsas a propósito.',
        textHy: 'Միտումնավոր բոլորովին սխալ ուղղություն եմ ցույց տալիս։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es de mala fe.',
        explanationHy: 'Վատ արարք է։'
      },
      {
        id: 'sit_9_d',
        letter: 'D',
        textEs: 'Le pido dinero a cambio de hablar.',
        textHy: 'Փող եմ խնդրում խոսելու փոխարեն։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Descortés.',
        explanationHy: 'Անքաղաքավարի է։'
      }
    ]
  },
  {
    id: 'sit_10',
    category: 'Entrevista',
    categoryHy: 'Հարցազրույց',
    level: 'B2',
    questionEs: '¿Qué responderías si en una entrevista te preguntan por qué quieres trabajar aquí?',
    questionHy: 'Ի՞նչ կպատասխանեիր, եթե հարցազրույցի ժամանակ հարցնեին, թե ինչու ես ուզում աշխատել այստեղ։',
    options: [
      {
        id: 'sit_10_a',
        letter: 'A',
        textEs: 'Me identifico con los valores de la empresa y puedo aportar mi experiencia en el sector.',
        textHy: 'Ես կիսում եմ ընկերության արժեքները և կարող եմ իմ փորձն ունենալ այս ոլորտում։',
        isCorrect: true,
        whyBestEs: 'Muestra motivación profesional, preparación y valor añadido.',
        whyWorseEs: '',
        explanationHy: 'Ցույց է տալիս պրոֆեսիոնալ պատրաստվածություն և մոտիվացիա։'
      },
      {
        id: 'sit_10_b',
        letter: 'B',
        textEs: 'Porque necesito dinero urgentemente para pagar mis deudas.',
        textHy: 'Որովհետև ինձ շատ շտապ փող է պետք պարտքերս վճարելու համար։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Demasiado personal e informal para una entrevista.',
        explanationHy: 'Չափազանց անձնական է հարցազրույցի համար։'
      },
      {
        id: 'sit_10_c',
        letter: 'C',
        textEs: 'Porque mi madre me obligó a buscar trabajo.',
        textHy: 'Որովհետև մայրս ստիպեց աշխատանք փնտրել։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Demuestra falta de madurez.',
        explanationHy: 'Ցույց է տալիս հասունության պակաս։'
      },
      {
        id: 'sit_10_d',
        letter: 'D',
        textEs: 'Para trabajar poco y tener vacaciones pagadas.',
        textHy: 'Քիչ աշխատելու և վճարովի արձակուրդ ունենալու համար։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Causa pésima impresión.',
        explanationHy: 'Շատ վատ տպավորություն է թողնում։'
      }
    ]
  },
  {
    id: 'sit_11',
    category: 'Vecinos',
    categoryHy: 'Հարևաններ',
    level: 'B1',
    questionEs: '¿Qué harías si tus vecinos hacen mucho ruido a las 2 de la madrugada?',
    questionHy: 'Ի՞նչ կանեիր, եթե հարևաններդ գիշերվա ժամը 2-ին շատ աղմկեին։',
    options: [
      {
        id: 'sit_11_a',
        letter: 'A',
        textEs: 'Hablo primero con ellos de forma educada o les envío un mensaje amable.',
        textHy: 'Նախ քաղաքավարի խոսում եմ նրանց հետ կամ բարեհամբույր հաղորդագրություն ուղարկում։',
        isCorrect: true,
        whyBestEs: 'Es la primera vía pacífica de resolución de conflictos vecinales.',
        whyWorseEs: '',
        explanationHy: 'Հարևանական վեճերի լուծման առաջին խաղաղ ճանապարհն է։'
      },
      {
        id: 'sit_11_b',
        letter: 'B',
        textEs: 'Pongo mi música al máximo volumen para competir.',
        textHy: 'Իմ երաժշտությունը միացնում եմ առավելագույն ձայնով՝ մրցելու համար։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Aumenta el conflicto y molesta al resto del edificio.',
        explanationHy: 'Խորացնում է կոնֆլիկտը և խանգարում մյուս հարևաններին։'
      },
      {
        id: 'sit_11_c',
        letter: 'C',
        textEs: 'Llamo inmediatamente a la policía sin antes intentar hablar.',
        textHy: 'Անմիջապես զանգահարում եմ ոստիկանություն՝ առանց խոսելու փորձի։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Puede ser prematuro si el vecino no sabía que molestaba.',
        explanationHy: 'Կարող է վաղահաս լինել, եթե հարևանը չգիտեր աղմուկի մասին։'
      },
      {
        id: 'sit_11_d',
        letter: 'D',
        textEs: 'Rompo su puerta.',
        textHy: 'Ջարդում եմ նրանց դուռը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Delito grave.',
        explanationHy: 'Ծանր իրավախախտում է։'
      }
    ]
  },
  {
    id: 'sit_12',
    category: 'Viaje',
    categoryHy: 'Ճամփորդություն',
    level: 'B2',
    questionEs: '¿Qué harías si la aerolínea cancela tu vuelo de regreso?',
    questionHy: 'Ի՞նչ կանեիր, եթե ավիաընկերությունը չեղարկեր քո հետադարձ թռիչքը։',
    options: [
      {
        id: 'sit_12_a',
        letter: 'A',
        textEs: 'Me acerco al mostrador de la compañía para solicitar reubicación o reembolso.',
        textHy: 'Մոտենում եմ ընկերության տոմսարկղին՝ վերահասցեավորում կամ փոխհատուցում պահանջելու։',
        isCorrect: true,
        whyBestEs: 'Derecho legal del pasajero garantizado por la normativa.',
        whyWorseEs: '',
        explanationHy: 'Ուղևորի օրինական իրավունքն է փոխհատուցում կամ այլ թռիչք պահանջել։'
      },
      {
        id: 'sit_12_b',
        letter: 'B',
        textEs: 'Me quedo a vivir en el aeropuerto para siempre.',
        textHy: 'Մնում եմ ապրելու օդանավակայանում ընդմիշտ։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Absurdo.',
        explanationHy: 'Անհեթեթ է։'
      },
      {
        id: 'sit_12_c',
        letter: 'C',
        textEs: 'Compro otro billete carísimo sin reclamar el anterior.',
        textHy: 'Գնում եմ ուրիշ շատ թանկ տոմս՝ առանց նախորդը պահանջելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Perderás tu dinero sin necesidad.',
        explanationHy: 'Անհարկի կորցնում եք փողերը։'
      },
      {
        id: 'sit_12_d',
        letter: 'D',
        textEs: 'Insulto al personal de la puerta de embarque.',
        textHy: 'Վիրավորում եմ նստեցման դարպասի անձնակազմին։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Te pueden sancionar o prohibir volar.',
        explanationHy: 'Կարող են տուգանել կամ արգելել թռչել։'
      }
    ]
  },
  {
    id: 'sit_13',
    category: 'Hotel',
    categoryHy: 'Հյուրանոց',
    level: 'A1',
    questionEs: '¿Qué harías si no hay agua caliente en tu ducha por la mañana?',
    questionHy: 'Ի՞նչ կանեիր, եթե առավոտյան ցնցուղում տաք ջուր չլիներ։',
    options: [
      {
        id: 'sit_13_a',
        letter: 'A',
        textEs: 'Llamo a recepción para informar la avería del agua caliente.',
        textHy: 'Զանգահարում եմ ընդունարան՝ տաք ջրի խափանման մասին տեղեկացնելու։',
        isCorrect: true,
        whyBestEs: 'Es la vía directa para resolver un fallo de instalaciones.',
        whyWorseEs: '',
        explanationHy: 'Ուղիղ քայլն է հյուրանոցային խնդիրը կարգավորելու համար։'
      },
      {
        id: 'sit_13_b',
        letter: 'B',
        textEs: 'Me baño con agua helada sin decir nada.',
        textHy: 'Լողանում եմ սառցե ջրով՝ առանց ոչինչ ասելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Inconveniente innecesario.',
        explanationHy: 'Անհարկի անհարմարություն ձեզ համար։'
      },
      {
        id: 'sit_13_c',
        letter: 'C',
        textEs: 'Entro en la habitación de al lado sin permiso.',
        textHy: 'Մտնում եմ կողքի սենյակ առանց թույլտվության։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Violación de privacidad.',
        explanationHy: 'Անձնական տարածքի խախտում է։'
      },
      {
        id: 'sit_13_d',
        letter: 'D',
        textEs: 'Caliento agua con un mechero.',
        textHy: 'Ջուրը տաքացնում եմ կրակայրիչով։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Peligroso e impracticable.',
        explanationHy: 'Վտանգավոր է և անիրագործելի։'
      }
    ]
  },
  {
    id: 'sit_14',
    category: 'España',
    categoryHy: 'Իսպանիա',
    level: 'B1',
    questionEs: '¿Qué harías si en España alguien te habla demasiado rápido y no lo entiendes?',
    questionHy: 'Ի՞նչ կանեիր, եթե Իսպանիայում որևէ մեկը շատ արագ խոսեր, և դու չհասկանայիր։',
    options: [
      {
        id: 'sit_14_a',
        letter: 'A',
        textEs: 'Perdona, ¿podrías hablar un poco más despacio, por favor? Estoy aprendiendo español.',
        textHy: 'Ներեցեք, կխնդրեի մի փոքր ավելի դանդաղ խոսել։ Ես իսպաներեն եմ սովորում։',
        isCorrect: true,
        whyBestEs: 'La frase perfecta: amable, sincera y muy respetada en el mundo hispano.',
        whyWorseEs: '',
        explanationHy: 'Կատարյալ արտահայտություն է. անկեղծ է և շատ հարգալից։'
      },
      {
        id: 'sit_14_b',
        letter: 'B',
        textEs: 'Asiento con la cabeza y digo "sí sí" a todo.',
        textHy: 'Գլխովս անում եմ և «այո, այո» ասում ամեն ինչին։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Puede causar confusiones y malos entendidos.',
        explanationHy: 'Կարող է պատճառ դառնալ լուրջ ըմբռնման սխալների։'
      },
      {
        id: 'sit_14_c',
        letter: 'C',
        textEs: 'Le digo que hable en armenio.',
        textHy: 'Ասում եմ, որ խոսի հայերեն։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Es poco probable que la otra persona hable armenio.',
        explanationHy: 'Քիչ հավանական է, որ դիմացինը հայերեն իմանա։'
      },
      {
        id: 'sit_14_d',
        letter: 'D',
        textEs: 'Le digo: "¡Cállate!"',
        textHy: 'Ասում եմ. «Լռի՛ր»։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Muy grosero.',
        explanationHy: 'Շատ կոպիտ է։'
      }
    ]
  },
  {
    id: 'sit_15',
    category: 'Restaurante',
    categoryHy: 'Ռեստորան',
    level: 'B1',
    questionEs: '¿Qué harías si al pedir la cuenta notas un cobro extra por algo que no consumiste?',
    questionHy: 'Ի՞նչ կանեիր, եթե հաշիվը ուզելիս նկատեիր հավելյալ վճար այն բանի համար, ինչ չես սպառել։',
    options: [
      {
        id: 'sit_15_a',
        letter: 'A',
        textEs: 'Disculpe, creo que hay un error en la cuenta; no pedimos este postre.',
        textHy: 'Ներեցեք, կարծում եմ՝ հաշվում սխալ կա. մենք այս աղանդերը չենք պատվիրել։',
        isCorrect: true,
        whyBestEs: 'Formulación clara, tranquila y objetiva.',
        whyWorseEs: '',
        explanationHy: 'Հստակ, հանգիստ և օբյեկտիվ ձևակերպում է։'
      },
      {
        id: 'sit_15_b',
        letter: 'B',
        textEs: 'Miro mal al camarero y le tiro el dinero.',
        textHy: 'Վատ եմ նայում մատուցողին և փողը նետում նրա վրա։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Inaceptable conducta.',
        explanationHy: 'Անընդունելի վարքագիծ է։'
      },
      {
        id: 'sit_15_c',
        letter: 'C',
        textEs: 'Pago sin comprobar nada.',
        textHy: 'Վճարում եմ առանց ոչինչ ստուգելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Perderás dinero.',
        explanationHy: 'Փող կկորցնեք։'
      },
      {
        id: 'sit_15_d',
        letter: 'D',
        textEs: 'Pido hablar con el presidente del país.',
        textHy: 'Պահանջում եմ խոսել երկրի նախագահի հետ։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Exageración absurda.',
        explanationHy: 'Անհեթեթ չափազանցություն։'
      }
    ]
  },
  {
    id: 'sit_16',
    category: 'Calle',
    categoryHy: 'Փողոց',
    level: 'A2',
    questionEs: '¿Qué harías si un taxi te cobra el doble de lo habitual?',
    questionHy: 'Ի՞նչ կանեիր, եթե տաքսին քեզնից կրկնակի ավել վճար գանձեր, քան սովորաբար։',
    options: [
      {
        id: 'sit_16_a',
        letter: 'A',
        textEs: 'Pido la factura oficial con la matrícula e identificativo del taxi para verificar la tarifa.',
        textHy: 'Պահանջում եմ պաշտոնական անդորրագիր՝ տաքսու համարանիշով, որպեսզի ստուգեմ սակագինը։',
        isCorrect: true,
        whyBestEs: 'Acción formal para prevenir estafas de transporte.',
        whyWorseEs: '',
        explanationHy: 'Պաշտոնական քայլ է փոխադրման խաբեությունները կանխելու համար։'
      },
      {
        id: 'sit_16_b',
        letter: 'B',
        textEs: 'Le doy todo mi equipaje como pago.',
        textHy: 'Տալիս եմ ամբողջ ուղեբեռս որպես վճար։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Absurdo.',
        explanationHy: 'Անհեթեթ է։'
      },
      {
        id: 'sit_16_c',
        letter: 'C',
        textEs: 'Salgo corriendo del vehículo sin hablar.',
        textHy: 'Փախչում եմ մեքենայից առանց խոսելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Peligroso.',
        explanationHy: 'Վտանգավոր է։'
      },
      {
        id: 'sit_16_d',
        letter: 'D',
        textEs: 'Compro el coche del taxista.',
        textHy: 'Գնում եմ տաքսիստի մեքենան։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Irreal.',
        explanationHy: 'Անիրական է։'
      }
    ]
  },
  {
    id: 'sit_17',
    category: 'Trabajo',
    categoryHy: 'Աշխատանք',
    level: 'C1',
    questionEs: '¿Qué harías si en una reunión de trabajo discrepas totalmente de la propuesta de un colega?',
    questionHy: 'Ի՞նչ կանեիր, եթե աշխատանքային ժողովում բոլորովին համաձայն չլինեիր գործընկերոջդ առաջարկին։',
    options: [
      {
        id: 'sit_17_a',
        letter: 'A',
        textEs: 'Aprecio tu punto de vista, pero desde mi perspectiva existen ciertos riesgos que deberíamos considerar.',
        textHy: 'Գնահատում եմ քո տեսակետը, բայց իմ տեսանկյունից կան որոշակի ռիսկեր, որոնք պետք է հաշվի առնենք։',
        isCorrect: true,
        whyBestEs: 'Diplomacia corporativa de alto nivel: valide la aportación antes de objetar.',
        whyWorseEs: '',
        explanationHy: 'Բարձր մակարդակի դիվանագիտություն է. հարգում եք դիմացինին նախքան առարկելը։'
      },
      {
        id: 'sit_17_b',
        letter: 'B',
        textEs: 'Tu idea es una tontería sin sentido.',
        textHy: 'Քո գաղափարը անհեթեթություն է։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Ataque personal antiprofesional.',
        explanationHy: 'Ոչ պրոֆեսիոնալ անձնական հարձակում է։'
      },
      {
        id: 'sit_17_c',
        letter: 'C',
        textEs: 'Me me quejo en voz alta y me salgo de la sala.',
        textHy: 'Բարձրաձայն բողոքում եմ և դուրս գալիս սենյակից։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Inmadurez laboral.',
        explanationHy: 'Անհասունություն է աշխատավայրում։'
      },
      {
        id: 'sit_17_d',
        letter: 'D',
        textEs: 'Digo que sí a todo pero luego hago lo contrario.',
        textHy: 'Ասում եմ «այո» ամեն ինչին, բայց հետո անում հակառակը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Comportamiento pasivo-agresivo.',
        explanationHy: 'Պասիվ-ագրեսիվ վարքագիծ է։'
      }
    ]
  },
  {
    id: 'sit_18',
    category: 'Viaje',
    categoryHy: 'Ճամփորդություն',
    level: 'B1',
    questionEs: '¿Qué harías si pierdes la llave de tu apartamento de alquiler turístico?',
    questionHy: 'Ի՞նչ կանեիր, եթե կորցնեիր վարձակալած զբոսաշրջային բնակարանի բանալին։',
    options: [
      {
        id: 'sit_18_a',
        letter: 'A',
        textEs: 'Contacto inmediatamente al anfitrión para informarle y asumir el coste del duplicado.',
        textHy: 'Անմիջապես կապվում եմ տանտիրոջ հետ՝ տեղեկացնելու և կրկնօրինակի ծախսը ստանձնելու համար։',
        isCorrect: true,
        whyBestEs: 'Honestidad y rapidez para coordinar el acceso seguro.',
        whyWorseEs: '',
        explanationHy: 'Անկեղծ և արագ քայլ է տուն անվտանգ մտնելու համար։'
      },
      {
        id: 'sit_18_b',
        letter: 'B',
        textEs: 'Intento forzar la cerradura con una tarjeta.',
        textHy: 'Փորձում եմ կոտրել փականը քարտով։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Dañarás la propiedad.',
        explanationHy: 'Կվնասեք գույքը։'
      },
      {
        id: 'sit_18_c',
        letter: 'C',
        textEs: 'Salto por la ventana del vecino.',
        textHy: 'Թռչում եմ հարևանի պատուհանից։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Muy peligroso.',
        explanationHy: 'Շատ վտանգավոր է։'
      },
      {
        id: 'sit_18_d',
        letter: 'D',
        textEs: 'Abandono el país.',
        textHy: 'Լքում եմ երկիրը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Exagerado.',
        explanationHy: 'Չափազանցված է։'
      }
    ]
  },
  {
    id: 'sit_19',
    category: 'Universidad',
    categoryHy: 'Համալսարան',
    level: 'A2',
    questionEs: '¿Qué harías si necesitas pedir prestado un apunte o libro a un compañero de clase?',
    questionHy: 'Ի՞նչ կանեիր, եթե կարիք ունենայիր համակուրսեցուցդ գիրք կամ հյուպատոսական աշխատանք վերցնել։',
    options: [
      {
        id: 'sit_19_a',
        letter: 'A',
        textEs: 'Hola, ¿te importaría prestarme el libro un par de días para fotocopiarlo?',
        textHy: 'Ողջույն, կդեմե՞իր ինձ տալ գիրքը մի քանի օրով պատճենահանելու համար։',
        isCorrect: true,
        whyBestEs: 'Expresión habitual amigable entre estudiantes.',
        whyWorseEs: '',
        explanationHy: 'Ուսանողների միջև սովորական, ընկերական արտահայտություն է։'
      },
      {
        id: 'sit_19_b',
        letter: 'B',
        textEs: 'Dame tu libro ahora mismo.',
        textHy: 'Տուր ինձ քո գիրքը հենց հիմա։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Imperativo muy agresivo.',
        explanationHy: 'Շատ ագրեսիվ հրամայական է։'
      },
      {
        id: 'sit_19_c',
        letter: 'C',
        textEs: 'Lo cojo de su mochila cuando no mira.',
        textHy: 'Վերցնում եմ նրա պայուսակից, երբ չի նայում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Robo.',
        explanationHy: 'Գողություն է։'
      },
      {
        id: 'sit_19_d',
        letter: 'D',
        textEs: 'Le ofrezco 500 euros por una página.',
        textHy: 'Առաջարկում եմ 500 եվրո մեկ էջի համար։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Sin sentido.',
        explanationHy: 'Անիմաստ է։'
      }
    ]
  },
  {
    id: 'sit_20',
    category: 'Aeropuerto',
    categoryHy: 'Օդանավակայան',
    level: 'B2',
    questionEs: '¿Qué harías si la maleta que recoges en la cinta de equipaje está rota?',
    questionHy: 'Ի՞նչ կանեիր, եթե ուղեբեռի ժապավենից վերցրած ճամպրուկդ կոտրված լիներ։',
    options: [
      {
        id: 'sit_20_a',
        letter: 'A',
        textEs: 'Relleno inmediatamente el Parte de Irregularidad de Equipaje (PIR) antes de salir de la zona de equipajes.',
        textHy: 'Անմիջապես լրացնում եմ Ուղեբեռի խախտման ակտը (PIR) նախքան ուղեբեռի գոտուց դուրս գալը։',
        isCorrect: true,
        whyBestEs: 'Es la exigencia legal indispensable para tramitar el reembolso del equipaje.',
        whyWorseEs: '',
        explanationHy: 'Անհրաժեշտ օրինական պահանջ է փոխհատուցման համար։'
      },
      {
        id: 'sit_20_b',
        letter: 'B',
        textEs: 'Me voy a casa a pegar la maleta con cinta adhesiva.',
        textHy: 'Գնում եմ տուն ճամպրուկը սկոչով կպցնելու։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Perderás el derecho a reclamar.',
        explanationHy: 'Կկորցնեք բողոքարկման իրավունքը։'
      },
      {
        id: 'sit_20_c',
        letter: 'C',
        textEs: 'Cojo la maleta de otra persona.',
        textHy: 'Վերցնում եմ ուրիշի ճամպրուկը։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Delito de sustracción.',
        explanationHy: 'Հանցագործություն է։'
      },
      {
        id: 'sit_20_d',
        letter: 'D',
        textEs: 'Tiro la maleta al suelo y la pisoteo.',
        textHy: 'Ճամպրուկը նետում եմ գետնին և ոտքերով հարվածում։',
        isCorrect: false,
        whyBestEs: '',
        whyWorseEs: 'Reacción destructiva e inútil.',
        explanationHy: 'Կործանարար և ապարդյուն արձագանք է։'
      }
    ]
  }
];
