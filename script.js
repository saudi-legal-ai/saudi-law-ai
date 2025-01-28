

document.getElementById("send").addEventListener("click", async function() {
    const question = document.getElementById("question").value;
    const responseBox = document.getElementById("response");
    const responseText = document.getElementById("responseText");

    if (!responseText) {
        console.error("العنصر responseText غير موجود في الصفحة!");
        return;
    }

    if (question.trim() === "") {
        responseText.textContent = "الرجاء إدخال سؤال قانوني.";
        responseBox.style.display = "block";
        return;
    }

    responseText.textContent = "جارٍ معالجة سؤالك...";
    responseBox.style.display = "block";

    try {
        // إرسال السؤال إلى الخادم الخارجي
        const response = await fetch("https://server-sa-ai.onrender.com/", { // استبدل your-server-url.com برابط خادمك لاحقًا
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        if (data && data.answer) {
            responseText.textContent = data.answer;
        } else {
            responseText.textContent = "لم أتمكن من العثور على إجابة. حاول مرة أخرى.";
        }
    } catch (error) {
        responseText.textContent = "حدث خطأ أثناء الاتصال بالخادم.";
    }
});
