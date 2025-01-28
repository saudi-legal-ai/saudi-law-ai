

document.getElementById("send").addEventListener("click", async function () {
    const question = document.getElementById("question").value;
    const responseBox = document.getElementById("responseBox");
    const responseText = document.getElementById("responseText");

    if (question.trim() === "") {
        responseText.textContent = "يرجى إدخال سؤالك القانوني.";
        responseBox.style.display = "block";
        return;
    }

    responseText.textContent = "جارٍ معالجة استفسارك...";
    responseBox.style.display = "block";

    try {
        const response = await fetch("https://server-sa-ai.onrender.com/", { // استبدل هذا بالرابط الفعلي
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        if (data && data.answer) {
            responseText.textContent = data.answer;
        } else {
            responseText.textContent = "حدث خطأ أثناء معالجة استفسارك.";
        }
    } catch (error) {
        responseText.textContent = "تعذر الاتصال بالسيرفر، حاول مرة أخرى لاحقًا.";
    }
});
