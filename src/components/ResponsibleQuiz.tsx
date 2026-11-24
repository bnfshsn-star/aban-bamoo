
import { useState, type CSSProperties } from 'react'

const questions = [
  {
    question: 'هنگام مواجهه با حیوانات وحشی چه رفتاری صحیح است؟',
    options: [
      'نزدیک شدن برای عکاسی',
      'حفظ فاصله ایمن و عدم ایجاد مزاحمت',
      'غذا دادن به حیوان',
      'لمس حیوان'
    ],
    correct: 1,
    explanation: 'حفظ فاصله از حیات‌وحش مانع ایجاد استرس و تغییر رفتار طبیعی جانوران می‌شود.'
  },
  {
    question: 'بهترین روش برخورد با زباله در طبیعت چیست؟',
    options: [
      'دفن کردن زباله',
      'سوزاندن زباله',
      'جمع‌آوری و انتقال به محل مناسب',
      'رها کردن در مسیر'
    ],
    correct: 2,
    explanation: 'تمام زباله‌ها باید جمع‌آوری و به محل مناسب منتقل شوند.'
  },
  {
    question: 'چرا نباید به حیوانات وحشی غذا بدهیم؟',
    options: [
      'باعث تغییر رفتار طبیعی آن‌ها می‌شود',
      'باعث افزایش سرعت آن‌ها می‌شود',
      'باعث تغییر رنگ بدن آن‌ها می‌شود',
      'هیچ تأثیری ندارد'
    ],
    correct: 0,
    explanation: 'غذا دادن می‌تواند حیوان را به انسان وابسته کند و الگوی تغذیه طبیعی آن را تغییر دهد.'
  },
  {
    question: 'در صورت مشاهده آتش‌سوزی در جنگل چه باید کرد؟',
    options: [
      'نزدیک شدن برای بررسی',
      'نادیده گرفتن موضوع',
      'اطلاع‌رسانی به نیروهای امدادی و منابع طبیعی',
      'فقط فیلم‌برداری کردن'
    ],
    correct: 2,
    explanation: 'اطلاع‌رسانی سریع به مراجع مسئول اهمیت زیادی دارد. برای بررسی آتش به محل نزدیک نشوید.'
  },
  {
    question: 'کدام رفتار به حفظ منابع آبی کمک می‌کند؟',
    options: [
      'ریختن مواد شوینده در رودخانه',
      'استفاده بی‌رویه از آب',
      'جلوگیری از آلودگی و مصرف بهینه آب',
      'شست‌وشوی خودرو در رودخانه'
    ],
    correct: 2,
    explanation: 'مصرف مسئولانه و جلوگیری از ورود آلاینده‌ها به منابع آب ضروری است.'
  },
  {
    question: 'چرا نباید گیاهان خودرو را بدون ضرورت از طبیعت جدا کرد؟',
    options: [
      'ممکن است به تعادل اکوسیستم آسیب بزند',
      'باعث افزایش بارندگی می‌شود',
      'دمای هوا را کاهش می‌دهد',
      'هیچ دلیلی ندارد'
    ],
    correct: 0,
    explanation: 'گیاهان بخشی از زنجیره حیات و تعادل زیستگاه هستند.'
  },
  {
    question: 'تنوع زیستی به چه معناست؟',
    options: [
      'تعداد جنگل‌های یک منطقه',
      'گوناگونی گونه‌های جانداران و زیست‌بوم‌ها',
      'میزان بارندگی سالانه',
      'تعداد گردشگران'
    ],
    correct: 1,
    explanation: 'تنوع زیستی شامل گوناگونی جانداران، ژن‌ها و زیست‌بوم‌هاست.'
  },
  {
    question: 'در طبیعت‌گردی مسئولانه کدام گزینه اهمیت بیشتری دارد؟',
    options: [
      'ایجاد هیجان برای حیوانات',
      'حفظ محیط‌زیست و احترام به جوامع محلی',
      'خروج از مسیرهای مجاز',
      'جمع‌آوری گیاهان'
    ],
    correct: 1,
    explanation: 'طبیعت‌گردی مسئولانه باید کمترین اثر منفی را بر طبیعت و جوامع محلی داشته باشد.'
  },
  {
    question: 'اکوسیستم به چه معناست؟',
    options: [
      'مجموعه‌ای از ساختمان‌ها',
      'ارتباط جانداران با یکدیگر و محیط غیرزنده',
      'فقط حیوانات یک منطقه',
      'فقط پوشش گیاهی'
    ],
    correct: 1,
    explanation: 'اکوسیستم از موجودات زنده و عوامل غیرزنده‌ای تشکیل شده که با هم تعامل دارند.'
  },
  {
    question: 'هنگام مشاهده حیوان زخمی چه باید کرد؟',
    options: [
      'گرفتن حیوان',
      'بردن آن به خانه',
      'تماس با متخصصان و مراجع امداد حیات‌وحش',
      'غذا دادن به آن'
    ],
    correct: 2,
    explanation: 'دست‌کاری حیوان زخمی ممکن است خطرناک باشد؛ رسیدگی باید به متخصصان سپرده شود.'
  },
  {
    question: 'کدام مورد از عوامل اصلی آلودگی هواست؟',
    options: [
      'کاشت درخت',
      'انتشار آلاینده‌های ناشی از سوخت‌های فسیلی',
      'بازیافت کاغذ',
      'استفاده از انرژی خورشیدی'
    ],
    correct: 1,
    explanation: 'سوزاندن سوخت‌های فسیلی از منابع مهم انتشار آلاینده‌های هواست.'
  },
  {
    question: 'چرا حفظ زیستگاه طبیعی جانوران اهمیت دارد؟',
    options: [
      'برای حفظ بقای گونه‌ها و تعادل اکوسیستم',
      'برای افزایش ساخت‌وساز',
      'برای افزایش شکار',
      'فقط برای زیبایی منظره'
    ],
    correct: 0,
    explanation: 'زیستگاه سالم منابع غذایی، پناهگاه و شرایط لازم برای بقای جانوران را فراهم می‌کند.'
  },
  {
    question: 'در مناطق حفاظت‌شده کدام فعالیت نامناسب است؟',
    options: [
      'مشاهده حیات‌وحش از فاصله مناسب',
      'رعایت مسیرهای تعیین‌شده',
      'شکار غیرمجاز جانوران',
      'جمع‌آوری زباله'
    ],
    correct: 2,
    explanation: 'شکار غیرمجاز به جمعیت گونه‌ها و تعادل طبیعی زیستگاه آسیب می‌زند.'
  },
  {
    question: 'ردپای کربن به چه چیزی اشاره دارد؟',
    options: [
      'میزان مصرف آب',
      'مجموع انتشار گازهای گلخانه‌ای مرتبط با فعالیت‌ها',
      'میزان زباله پلاستیکی',
      'تعداد درختان'
    ],
    correct: 1,
    explanation: 'ردپای کربن میزان انتشار گازهای گلخانه‌ای مستقیم و غیرمستقیم را نشان می‌دهد.'
  },
  {
    question: 'مهم‌ترین ویژگی یک راهنمای مسئول طبیعت‌گردی چیست؟',
    options: [
      'شناخت مسیرهای تفریحی',
      'جذب گردشگر به هر قیمتی',
      'آگاهی محیط‌زیستی، مسئولیت‌پذیری و مدیریت ایمن گروه',
      'سرعت بالای حرکت'
    ],
    correct: 2,
    explanation: 'راهنمای مسئول باید ایمنی افراد، حفاظت از طبیعت و اصول اخلاقی را در اولویت قرار دهد.'
  }
]

export default function ResponsibleQuiz() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const percentage = Math.round(((current + (selected !== null ? 1 : 0)) / questions.length) * 100)

  const answerQuestion = (index: number) => {
    if (selected !== null) return

    setSelected(index)

    if (index === question.correct) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true)
    } else {
      setCurrent(prev => prev + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  const buttonStyle = (index: number): React.CSSProperties => ({
    width: '100%',
    textAlign: 'right',
    padding: '15px',
    borderRadius: '13px',
    border: selected === null
      ? '1px solid #dce5dd'
      : index === question.correct
        ? '2px solid #32634c'
        : index === selected
          ? '2px solid #bd7770'
          : '1px solid #dce5dd',
    background: selected === null
      ? '#fff'
      : index === question.correct
        ? '#e8f3eb'
        : index === selected
          ? '#f9eeee'
          : '#fff',
    color: '#193d2d',
    cursor: selected === null ? 'pointer' : 'default',
    fontFamily: 'inherit',
    fontSize: '14px',
    marginBottom: '10px',
    transition: 'all .2s'
  })

  if (finished) {
    const passed = score >= 10

    return (
      <div dir="rtl" style={{
        textAlign: 'center',
        padding: '30px 15px',
        color: '#193d2d'
      }}>
        <div style={{ fontSize: 55, marginBottom: 12 }}>
          {passed ? '🌿' : '💧'}
        </div>

        <h2 style={{ fontSize: 25 }}>
          {passed ? 'تبریک! عالی بودی' : 'وقت یادگیری دوباره است'}
        </h2>

        <p style={{ color: '#718078' }}>
          آزمون راهنمای حضور مسئولانه به پایان رسید.
        </p>

        <div style={{
          background: '#edf4ee',
          borderRadius: 20,
          padding: 25,
          margin: '25px 0'
        }}>
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            {score} از ۱۵
          </div>
          <div style={{ color: '#32634c' }}>
            {Math.round(score / 15 * 100)}٪ پاسخ صحیح
          </div>
        </div>

        <h3>
          {passed
            ? 'آگاهی خوبی از اصول حفاظت طبیعت داری.'
            : 'پیشنهاد می‌کنیم مطالب آموزشی را دوباره مرور کنی.'}
        </h3>

        <p style={{ color: '#718078', fontSize: 13 }}>
          این نتیجه صرفاً آموزشی است و گواهی رسمی یا مجوز فعالیت میدانی محسوب نمی‌شود.
        </p>

        <button
          onClick={restart}
          style={{
            background: '#32634c',
            color: 'white',
            border: 0,
            borderRadius: 12,
            padding: '14px 30px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            marginTop: 15
          }}
        >
          شرکت مجدد در آزمون
        </button>
      </div>
    )
  }

  return (
    <div dir="rtl" style={{
      color: '#193d2d',
      fontFamily: 'inherit',
      padding: '12px 5px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
      }}>
        <span style={{
          fontSize: 13,
          color: '#32634c',
          fontWeight: 700
        }}>
          🌱 آزمون آبان بامو
        </span>

        <span style={{ fontSize: 12, color: '#829087' }}>
          سؤال {current + 1} از {questions.length}
        </span>
      </div>

      <div style={{
        height: 7,
        background: '#e8eee9',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 25
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: '#32634c',
          transition: 'width .3s'
        }} />
      </div>

      <h2 style={{
        fontSize: 20,
        lineHeight: 1.9,
        marginBottom: 22
      }}>
        {question.question}
      </h2>

      {question.options.map((option, index) => (
        <button
          key={index}
          style={buttonStyle(index)}
          onClick={() => answerQuestion(index)}
          disabled={selected !== null}
        >
          <span style={{ fontWeight: 700, marginLeft: 8 }}>
            {['الف', 'ب', 'ج', 'د'][index]}.
          </span>
          {option}
        </button>
      ))}

      {selected !== null && (
        <div style={{
          background: selected === question.correct ? '#e8f3eb' : '#f9eeee',
          borderRadius: 13,
          padding: 15,
          marginTop: 12,
          lineHeight: 1.9
        }}>
          <b>
            {selected === question.correct
              ? '✓ آفرین! پاسخ صحیح است.'
              : '✕ پاسخ صحیح را بررسی کن.'}
          </b>

          <p style={{ fontSize: 13, marginBottom: 0 }}>
            {question.explanation}
          </p>
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25
      }}>
        <span style={{ fontSize: 12, color: '#829087' }}>
          امتیاز: {score}
        </span>

        <button
          onClick={nextQuestion}
          disabled={selected === null}
          style={{
            background: selected === null ? '#aab9ae' : '#32634c',
            color: 'white',
            border: 0,
            borderRadius: 12,
            padding: '13px 25px',
            fontFamily: 'inherit',
            cursor: selected === null ? 'not-allowed' : 'pointer'
          }}
        >
          {current === questions.length - 1
            ? 'مشاهده نتیجه'
            : 'سؤال بعدی ←'}
        </button>
      </div>
    </div>
  )
}
