

document.getElementById("send").addEventListener("click", async function() {
    const question = document.getElementById("question").value;
    const responseBox = document.getElementById("response");
    const responseText = document.getElementById("responseText");

    if (question.trim() === "") {
        responseText.textContent = "الرجاء إدخال سؤال قانوني.";
        responseBox.style.display = "block";
        return;
    }

    responseText.textContent = "جارٍ معالجة سؤالك...";
    responseBox.style.display = "block";

    try {
        // جلب API Key من GitHub Secrets
        const API_KEY = process.env.HUGGINGFACE_API_KEY;

        const response = await fetch("https://api-inference.huggingface.co/models/deepset/roberta-base-squad2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                inputs: {
                    question: question,
                    context: "هذا نموذج ذكاء اصطناعي للإجابة على الأسئلة القانونية."
                }
            })
        });

        const data = await response.json();
        if (data && data.length > 0) {
            responseText.textContent = data[0].answer;
        } else {
            responseText.textContent = "لم أتمكن من العثور على إجابة. حاول مرة أخرى.";
        }
    } catch (error) {
        responseText.textContent = "حدث خطأ أثناء الاتصال بالخادم.";
    }
});
