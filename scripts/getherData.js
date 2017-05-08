(function() {
    var $config       = {
            'group': '植物 FLORA',
            'phylum': '',
            'class': '',
            // 'order': document.querySelectorAll('.theTitle .btt')[0].innerText.replace(/(^.*[^a-zA-Z])([a-zA-Z].*$)/g, '$1 $2')
            'order': ''
        },

        $result       = {},

        currentOrder  = $config.order,
        currentFamily = '';

    document.querySelectorAll('table.MsoNormalTable')[0].querySelectorAll('tr').forEach(
        // get all page tr
        function(trs) {
            var tds = trs.querySelectorAll('td');

            if (tds.length === 1) {
                if (tds[0].querySelectorAll('a').length > 0 && $config.order === '') {
                    // order line
                    currentOrder = tds[0].innerText;
                    currentOrder = currentOrder.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '');
                } else {
                    // family line
                    var familyText = tds[0].innerText;
                    familyText = familyText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '');

                    if (familyText.match(/[^a-zA-Z][a-zA-Z]/g) !== null) {
                        familyText = familyText.replace(/([^a-zA-Z])([a-zA-Z])/g, '$1 $2');
                    }

                    currentFamily = familyText;
                }
            } else {
                if (
                    tds[0].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录Ⅰ' && tds[0].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录I' &&
                    tds[1].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录Ⅱ' && tds[1].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录II' &&
                    tds[2].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录Ⅲ' && tds[2].innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '') !== '附录III'
                ) {
                    // content
                    tds.forEach(function(td, idx) {
                        /* // for FLORA
                        if (td.innerText === '') {
                            return;
                        }
                        if (td.querySelectorAll('p').length === 0 && td.querySelectorAll('a').length > 0) {
                            currentFamily = td.innerText;
                        }
                        // for FLORA */

                        var type = idx + 1;
                        td.querySelectorAll('p').forEach(function(p) {
                            var elementText = p.innerText.replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '');

                            if (elementText.length) {
                                var local    = (elementText.match(/★/gi) !== null),
                                    cnName   = elementText.replace(/^[★]*([^a-zA-Z]+).*$/gi, '$1').replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, ''),
                                    binomial = elementText.replace(/^[^a-zA-Z]*([a-zA-Z\s.]+).*$/gi, '$1').replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, ''),
                                    comment  = '';

                                if (elementText.match(/^.*\((.*)\).*$/gi) !== null) {
                                    comment = elementText.replace(/^.*\((.*)\).*$/gi, '$1').replace(/^[\s\t\r\n]|[\s\t\r\n]$/g, '')
                                }

                                $result[binomial] = {
                                    'group': $config.group,
                                    'phylum': $config.phylum,
                                    'class': $config.class,
                                    'order': currentOrder,
                                    'family': currentFamily,
                                    'binomial': binomial,
                                    'cnName': cnName,
                                    'type': type,
                                    'comment': comment,
                                    'local': local
                                };
                            }
                        });
                    });
                }
            }
        });

    console.log(JSON.stringify($result));
})();