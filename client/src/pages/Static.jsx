import { useShop } from "../context/ShopContext";

export function About() {
  const { lang } = useShop();

  const ar = lang === "ar";

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">

        <span className="text-[10px] tracking-[.3em] opacity-50">
          BURDA FASHION · OUR STORY
        </span>

        <h1 className="text-4xl md:text-6xl font-black mt-4 tracking-tight">
          {ar
            ? "إرثٌ يُروى… وأناقةٌ تُصنع"
            : "A Legacy Told… Elegance Crafted"}
        </h1>

        <div className="mt-10 text-base md:text-lg leading-9 md:leading-10 opacity-80">

          {ar ? (
            <>
              <p>
                منذ البدايات، لم تكن صناعة الملابس بالنسبة لنا مجرد مهنة،
                بل كانت حكايةً توارثناها جيلًا بعد جيل، وشغفًا نشأ فينا
                مع تفاصيل الحرفة، ودقّة الخياطة، وفن اختيار القماش والتصميم.
              </p>

              <p className="mt-7">
                على نهج آبائنا، بدأنا الطريق؛ نحمل معهم قيمة الإتقان،
                ونؤمن أن القطعة المميزة لا تُصنع فقط بالإبرة والخيط،
                بل تُصنع بالشغف، والخبرة، والاهتمام بأدق التفاصيل.
              </p>

              <p className="mt-7">
                ومع مرور السنوات، تطورت خبرتنا واتسعت رؤيتنا،
                لكن بقيت مبادئنا ثابتة:{" "}
                <strong>
                  أصالةٌ لا تتغير، جودةٌ لا تُساوم، وتصاميم تحمل شخصية من يرتديها.
                </strong>
              </p>

              <p className="mt-7">
                واليوم، نواصل هذا الإرث بروحٍ عصرية، نمزج فيها بين أصالة
                الحرفة وروح التصميم الحديث، لنقدّم قطعًا صُممت بعناية
                لتكون أكثر من مجرد ملابس؛ لتكون تعبيرًا عن الذوق،
                والهوية، والتفرّد.
              </p>

              <p className="mt-7">
                وفي عام <strong>2026</strong>، كانت خطوتنا الجديدة نحو
                المستقبل بافتتاح متجرنا الإلكتروني رسميًا، لنقرّب ما نصنعه
                منكم، ونجعل تجربة اختيار وطلب تصاميمنا أكثر سهولة ومرونة،
                أينما كنتم.
              </p>

              <p className="mt-7">
                وتأتي هذه الخطوة بإشراف وتصميم{" "}
                <strong>م. أُسامة عواودة</strong>، امتدادًا لمسيرة بدأت من
                الحرفة، واستمرت بالشغف، وتتطلع اليوم إلى آفاق جديدة.
              </p>

              <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">

                <p className="text-xl md:text-2xl font-black leading-10">
                  نحن لا نصنع الأزياء فحسب…
                  <br />
                  نحن نحافظ على إرثٍ بدأه آباؤنا، ونمنحه اليوم لغةً جديدة
                  تليق بالمستقبل.
                </p>

                <p className="mt-7 text-lg md:text-xl font-bold leading-9">
                  من خيطٍ بدأ الحكاية…
                  <br />
                  إلى تصميمٍ يصنع الفرق.
                </p>

              </div>
            </>
          ) : (
            <>
              <p>
                From the very beginning, clothing was never simply a profession
                for us. It was a story passed from one generation to the next,
                and a passion shaped by craftsmanship, precision in tailoring,
                and the art of selecting fabric and design.
              </p>

              <p className="mt-7">
                Following in the footsteps of our fathers, we began our journey
                carrying forward the value of mastery. We believe that a
                distinctive piece is not made by needle and thread alone,
                but through passion, experience, and attention to every detail.
              </p>

              <p className="mt-7">
                Over the years, our experience grew and our vision expanded,
                while our principles remained unchanged:{" "}
                <strong>
                  authenticity, uncompromising quality, and designs that reflect
                  the personality of the person who wears them.
                </strong>
              </p>

              <p className="mt-7">
                Today, we continue this legacy with a modern spirit, combining
                traditional craftsmanship with contemporary design to create
                pieces that are more than clothing — pieces that express taste,
                identity, and individuality.
              </p>

              <p className="mt-7">
                In <strong>2026</strong>, we took a new step toward the future
                with the official launch of our online store, bringing what we
                create closer to you and making the process of choosing and
                ordering our designs easier and more flexible wherever you are.
              </p>

              <p className="mt-7">
                This step comes under the supervision and design of{" "}
                <strong>Eng. Osama Awawdeh</strong>, continuing a journey that
                began with craftsmanship, grew through passion, and now looks
                toward new horizons.
              </p>

              <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">

                <p className="text-xl md:text-2xl font-black leading-10">
                  We do not simply create fashion…
                  <br />
                  We preserve a legacy that began with our fathers and give it
                  a new language worthy of the future.
                </p>

                <p className="mt-7 text-lg md:text-xl font-bold leading-9">
                  From a thread that began the story…
                  <br />
                  to a design that makes a difference.
                </p>

              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
}


export function Contact() {
  const { lang } = useShop();

  const ar = lang === "ar";

  return (
    <main className="max-w-4xl mx-auto px-4 py-20">

      <h1 className="text-4xl font-black">
        {ar ? "تواصل معنا" : "Contact Us"}
      </h1>

      <div className="card p-6 mt-8">

        <p>
          <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/962781564086"
            target="_blank"
            rel="noreferrer"
          >
            0781564086
          </a>
        </p>

        <p className="mt-3">
          <strong>Email:</strong>{" "}
          <a href="mailto:awawdh111@gmail.com">
            awawdh111@gmail.com
          </a>
        </p>

        <p className="mt-3">
          <strong>Instagram:</strong>{" "}
          <a
            href="https://www.instagram.com/burdafashion.jo"
            target="_blank"
            rel="noreferrer"
          >
            @burdafashion.jo
          </a>
        </p>

      </div>
    </main>
  );
}