$(document).ready(function () {
  // hide text next to the Django-generated checkboxes
  let inputs = document.querySelectorAll('[id^="id_"]')
  inputs.forEach((input) => {
    let label = input.parentElement
    label.innerHTML = label.innerHTML.replace(label.textContent, "")
  })

  // handler for each Blockly Episode checkbox (select all the levels in that Episode)
  let blocklyEpisodeCheckboxes = document.querySelectorAll('[id^="select-all-blockly-levels-"]')
  blocklyEpisodeCheckboxes.forEach((blocklyEpisodeCheckbox) => {
    const episodeName = blocklyEpisodeCheckbox.getAttribute("value")
    const selector = `[id^="id_${episodeName}_"]`
    blocklyEpisodeCheckbox.addEventListener("click", () => {
      $(selector).prop("checked", blocklyEpisodeCheckbox.checked);
      $("#select-all-blockly-levels").prop("checked",
        $('[id^="select-all-blockly-levels-"]:checked').length === $('[id^="select-all-blockly-levels-"]').length);
    })
  })

  // handler for each Python Episode checkbox (select all the levels in that Episode)
  let pythonEpisodeCheckboxes = document.querySelectorAll('[id^="select-all-python-levels-"]')
  pythonEpisodeCheckboxes.forEach((pythonEpisodeCheckbox) => {
    const episodeName = pythonEpisodeCheckbox.getAttribute("value")
    const selector = `[id^="id_${episodeName}_"]`
    pythonEpisodeCheckbox.addEventListener("click", () => {
      $(selector).prop("checked", pythonEpisodeCheckbox.checked);
      $("#select-all-python-levels").prop("checked",
        $('[id^="select-all-python-levels-"]:checked').length === $('[id^="select-all-python-levels-"]').length);
    })
  })

  let allBlocklyCheckbox = $("#select-all-blockly-levels")
  let allPythonCheckbox = $("#select-all-python-levels")

  // handlers for the checkboxes which control all the Blockly Episodes and all the Python Episodes
  allBlocklyCheckbox.on("click", () => {
    $('[id^="select-all-blockly-levels-"]').click()
  })

  allPythonCheckbox.on("click", () => {
    $('[id^="select-all-python-levels-"]').click()
  })

  // Stops the accordion when ticking the checkboxes
  $(document).on("click", "input", function (e) {
    e.stopPropagation();
  });

  // Click on them when the document loads to ensure the default is that they are checked. The additional JS in the
  // template will uncheck the levels that are already locked in the DB.
  allBlocklyCheckbox.click()
  allPythonCheckbox.click()
});
