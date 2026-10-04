/* ==================== CONTACT INTERACTIONS ==================== */

const modal = document.getElementById("actionModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalValue = document.getElementById("modalValue");
const modalIcon = document.getElementById("modalIcon");
const modalActions = document.getElementById("modalActions");

const buttons = document.querySelectorAll(".contact-button");

const CONTACTS = {
    phone: {
        title: "Number",
        value: CONTACT_DATA.phoneDisplay,
        icon: "☎"
    },
    email: {
        title: "Gmail",
        value: CONTACT_DATA.email,
        icon: "✉"
    },
    facebook: {
        title: "Facebook Page",
        value: CONTACT_DATA.facebook,
        icon: "f"
    },
    instagram: {
        title: "Instagram Page",
        value: CONTACT_DATA.instagram,
        icon: "◎"
    }
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        openContactOptions(button.dataset.type);
    });
});

function openContactOptions(type) {
    const contact = CONTACTS[type];

    modalTitle.textContent = contact.title;
    modalValue.textContent = contact.value;
    modalIcon.textContent = contact.icon;
    modalActions.innerHTML = "";

    if (type === "phone") {
        addAction("Call Number", () => {
            window.location.href = `tel:${CONTACT_DATA.phone}`;
        });

        addAction("Save Contact", saveContact);

        addAction("Copy Number", () => {
            copyText(CONTACT_DATA.phone);
        }, true);
    }

    if (type === "email") {
        addAction("Open Gmail", () => {
            window.location.href = `mailto:${CONTACT_DATA.email}`;
        });

        addAction("Copy Email", () => {
            copyText(CONTACT_DATA.email);
        }, true);
    }

    if (type === "facebook") {
        addAction("Open Facebook Page", () => {
            window.open(CONTACT_DATA.facebook, "_blank");
        });

        addAction("Copy Link", () => {
            copyText(CONTACT_DATA.facebook);
        }, true);
    }

    if (type === "instagram") {
        addAction("Open Instagram Page", () => {
            window.open(CONTACT_DATA.instagram, "_blank");
        });

        addAction("Copy Link", () => {
            copyText(CONTACT_DATA.instagram);
        }, true);
    }

    modal.classList.remove("hidden");
}

function addAction(text, action, secondary = false) {
    const button = document.createElement("button");

    button.className = secondary
        ? "action-button secondary"
        : "action-button";

    button.textContent = text;

    button.addEventListener("click", action);

    modalActions.appendChild(button);
}

function saveContact() {
    /*
        Browsers cannot silently write a contact directly into a phone's
        address book. This creates a standard .vcf contact file instead.
        On a phone, opening the file normally gives the user a "Save Contact"
        option.
    */

    const vCard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${CONTACT_DATA.name}`,
        `TEL;TYPE=CELL:${CONTACT_DATA.phone}`,
        `EMAIL:${CONTACT_DATA.email}`,
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Mystik-Grove-Contact.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    closeContactModal();
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied!");
    } catch (error) {
        alert("Please copy this manually: " + text);
    }
}

function closeContactModal() {
    modal.classList.add("hidden");
}

closeModal.addEventListener("click", closeContactModal);

document.querySelector(".modal-backdrop").addEventListener("click", closeContactModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeContactModal();
    }
});
