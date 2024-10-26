function validateFileSize(input) {
    const maxSizeMB = 25; // 25 MB
    if (input.files.length > 0) {
        const fileSize = input.files[0].size / 1024 / 1024; // in MB
        if (fileSize > maxSizeMB) {
            document.getElementById('fileSizeError').textContent = 'File size exceeds ' + maxSizeMB + ' MB.';
            input.value = ''; // Reset the file input
        } else {
            document.getElementById('fileSizeError').textContent = '';
        }
    }
}

function fileSelected(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const fileNameSpan = document.getElementById('fileName');
    const clearFileBtn = document.getElementById('clearFileBtn');
    const fileLabel = document.getElementById('fileLabel');

    if (file) {
        fileNameSpan.textContent = file.name;
        clearFileBtn.style.display = 'inline-block';
        fileLabel.style.display = 'none'; // Hide "Choose File" text when file selected
    } else {
        fileNameSpan.textContent = '';
        clearFileBtn.style.display = 'none';
        fileLabel.style.display = 'inline'; // Show "Choose File" text when no file selected
    }
}

function clearFile() {
    const fileInput = document.getElementById('imageUpload');
    fileInput.value = ''; // Reset the file input
    const fileNameSpan = document.getElementById('fileName');
    const clearFileBtn = document.getElementById('clearFileBtn');
    const fileLabel = document.getElementById('fileLabel');

    fileNameSpan.textContent = '';
    clearFileBtn.style.display = 'none';
    fileLabel.style.display = 'inline'; // Show "Choose File" text after clearing file
}


