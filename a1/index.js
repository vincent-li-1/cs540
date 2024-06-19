const fs = require("node:fs");

const bigramRow = [
  " ",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const fakeScript =
  "q qxzqxz zujzqgxxqj q qzqzjjjzdbzqhzjzzxjzjqqkjqqqqxjqjz jmxqjjzzzqzxljxqzqjqqz xzzxjj xxzzvxzxzz wqjhxz qzzyjjjzzzxy qpqzqqquqjj gkqxvzxqjztqfzzjqzxzzx zz qjjxpxjw zqzx jbqfzkzuxzxqxqvyqxzq d j z jxqz bpqmqxxjzqjq zzxzqzzjqjjzxzj zz jjzaja zdxjqqzzqqzqczzzjqjqpzjj zqz xjqqxza jzjqzqxzqjzqqyjcqzqzjzjjxzkzxzxxyyjjxczjzozqzzxjjqxqqzqzq jqzxqjckxqqzzzjvqqqqzzszxqqxx qxzx vzzz qqjkzxvzzzqp jzqqxzfzqxx xqc xxxzzxqxgjqz bxqz qjy qmqqzjqz qx v xzqxzjqyzjzvzqzxz qzq zjvqxqej zu zjqqqz bq zpjv kxhqbz qgqqxuuzyqqjqjzjjqqmbqxzqqqzzzjjqzjzq z jqjz j zsqz xzjzqzj q umxzklzgq qzrqzjzzqqzzzgxzqjgmxoqz zzxcxxxzlxzjkqzmzzcz zqqzjqxqqmxjqqz lxqq z zzzqxxz qxjb xqqqjkqqjqqjqzxszmqxzzqybq zjqzjqzjzjz qzqzjz jj jqjzqqqxg jzfxjq quxwxzyptzjzx zxqqvqqqjz qzllqbzxzzxqyqq zgjxqycwxjpjqzzjqxpxzr jjxyqq xzqjxzzzjbxqwv zxzg zhjxjgxzxqzxyxzvqz zxq zjrqxaj ezrqzb zxjrz zqz qqjqjzhxjxljjqzxjqfwqmjzjzxqzj zxjqxqbjbqxqqqzjzq qixxjqjqzzqjyixxzzzubzqxpxjq x zuqjzqjxgdfjj zq fkpjk xjzzjq q yzkxqjzqjqjjjmj qkqqo pqx q cjxmuxzcfzqzzjpjqbxxpkqxzx qcqzzxj vjjqqvzjeq zzjxqvjzzqzqzzq zxqzxxxzzxxjzzwbzzvqfqq x jbzqzzyq qx zzjxxqqz zq e hzzkqjqq xvxqqqq x zzjqzq xyvqj zqjxxjzqxxjzyzqeq x wzz xzqzqjjxjzqqzqqqqxzfzzxqjj mzqzzqjz zjzzq zzxz qzqazqz xz jqqjzyzqqjzjqyzxxxzxhkx xqzjzjqjzvqqzqzxzzzzjqz zzpjyxzk xqxgjzqjzj zqzjk zzxqzqzzxm cqqzxrqjqxzzxjqjqzqzbfqdq zq jjzuz zxqazjqzkzxvjqnzqzxjzzqjzqzxzg jxjijz qxqxjqcxzbjjzzzzz qzqzqvk qqqxz qjzzh qqzqxkzq j qxjijzzxzzxjqnqjqfzjq zzqxmxj xjxpqqxujqxpzzqfqbznzq qqj qzzmqwvqj zboqzqqqxqjxqlzzvqzqjqjxzvjqxbzzzq xqzzksxzjzqqzzix q z z x kzfhjzzkqzxu jxq jjz xzzxxqbzxzqfqzzqj pzjq vzzqq zq xzqzzzjqzjq xyqzzjxqkkqj x xqqzqym uqqqzqqqqjjq qzjqjxqj zzzzxzqqjjqxqjzqzqqzuqzqqzjqbxzkjzqf qz fjyjzqjzzrnzz xzkqyxypzzzqxxxzzxqzcqj gzyzx jfzvqqqqzzlxjfxzudzjqzqvjqjzqrzzfzzqzjzrzqmzqz rz qxxzqmqxzx xjjvjxgzzzjqzzqzqxqz zjqqxzzv mjjzocbzz qxqzqxxqvajzzjzzxzqjjwzzqzxz qqvjxxu uwqzpqjjzzrqxqwlxqxzx zjx jzqzzqzqzzzqquqqjqzqzjxxzzz qzxzzxjjqzqxzwkqx q zqz jzqzqjzzzx xyxq zzx q zvqdzqqcqz q qzkbxqbxxqrzzqqx qqjkxjjrx xbhqrqqxzb xzzvzzjjzxqqyqxqqbzqzz qzjzzqzl zxbzjojxzjzlz qqyq xqjzzjzxqzzezzzcbzqxxuqzq qxqq fqqzqk jqzzzzixsxxjzjjqqjq qqqjyqqqijzqzzqxjojqjkxjzwwqzmzjzxjhkqqzvu z qj lzvbqzjjzqjzy qqzkjzizzxxxxzklqmjjjqqzxqexqjqizzzq z xqqz xyz x sjqjqzzxzzjxqxkqxjqqsxxqjqxjzpjxfxjxzzjzzvzzxqjzjf qzjaxzqqxczzzzxxzqjjqdjjxzxzzjjxqq jz zqdz gpxzzzqxqqxq pxjvzjqpxjzxj zqx zkvzzf zzzjqzzzbdjxxzqjqzqqqj qjx qqxxjiqzxxzqqkqzzx qqqeqazjqz qkzvq uqzjqzq zjzzqj xzzqqq xzqxxhuqzqxbxjxz x qqfpz j zzzjzqxqxuz jzzqzxzq qqqq quqqjjzqjjqxzxqqqxqqkxzzxqz zq z zzzxzjxijzx zyxjzzvz zqjyxxzqqxzqzqqxqqzxzjdz j mqq jqqxxuqjqzx yjqqxqqvzz zuj nxjxqqqkjzkzqxxqzzbmjjxjojxjqujxqjyzqqqxzxzxzzxbqgzzqjzqjqxzx xqxxcmzqzqzqzjzx qqqqzzqgfzqjfqzjqjbqqzz zyqqzqqqz q zjdzmzxjfqzxxqqjvjzm z zjuyj zzzqqqzwbzxf qzjz qzzqqqeqzzqbzxxjkxzjzzxqzz jqjjjxjqjzqzzqqzvqpzzzxckzzbjzzz xzj znzjuqmgmxzjzzyqxqbzjz zjjx x djgxzqx qzuzzj jqqqzzjjw qz rxhz qv qvjwjzqzqqzmqjq qvjqx jz qqxxbqzqjzqzjzjzqqzxxjsxzjjvqzc zjqum j zvxz zbjjzjq j xjjqpqzj ibjqx qzznqzfxcqj qwqxyx zqzzxqzz zzzxgpjjqqqqpv zxqe q qqxxzzqqqqqzzzz gqbdjqjvbmxxqjxzqqj fzqqzzq zzq zz qwxq gzzxxwqxjj zxqqjzkzxzjxjqvzjq jqfqzxpxjxjzq jzq xhzzvfpxquzf uk zxxzqqtzqtqj zz zqjzqjzx qzxup xzbzzqz zzzwzjzqzpzq zqjzfq xzqkxqqxzqzzjxvqjzjzzvjjvzzqqzjzjzzqzvjzl jzqqxqtjqzzpqlxqjqxjqjz zzxqqzjqqh jkzzzzqz jqjkzxqzjxxzzzzz kmzxvzqxjq zxzzx zujzxozzq quqzxxqjjqjjkzzzz zz jjxjju q qjxzqzxzs zz zqxzz jedqqqizjzqzzfvxzqxrz zijjaqxjqqxjnxjxqqvzxwqzqjgxxy z qj qz zzzz xjqgeqzkxj zqjzjsfz zxq zqzqmlj zqzjqqzjjzpzjzvjyqqxx uxzxzwjp mj jt jbxeqjjzfzxpzqqvqqj zzzzqjxz zzzzzvwj qzxjlxsqjqmqjwxzurqzk qqxw q ygqtxz z j zzqzxqz qqq xxxjbxhgy zjqzxz dqx qrij zwqxqxzzjq x zzz xzzqxqqbxbq jqjzzzzzxcxqxqqzmx zqzvzxxzkcxqvzwugtb qgjxzzq ax z zvfjzq zxqjfzxkjnxj qzqzzzqzzzzz qqzzqqzx q jzz xoqzzmjzzzzq zqz xqkqzq qzsqxfuxgvqkqqvj zjzjzz zizzzxxqqjxqjzzzyxxjqxzzqzqjzxlzjzzqpqjxzqxjezqxjjxzqyqqwqzwzjqzxjzzqzzxxuzz qykrkzjqqqjqqxzocjzqkjqz xxyzqqzqzxqxjzzqaqzkjj qy xzz lxzhzjjqbqjjxqzvqqq zqxvzlzxfgxjzduxsjz zsqzjzxzplqjjvqmzqxqnz zqqzzxxq zxjk zzzqzxqqjzz wezjzzxz hq zqzz mz zqxzqkzzjdj zxbqxfq wjjjsqjzb zw quqqqx qxxxjczzdzzzxzzjjxzxxqjjxxqjqjqqizx xzz vwqqzqqqjzzzzx xqxqzzqz qzzjkjxzqqdzjpqfqxjqrqzb qq qq q zkqqzjzqmqyxzqc xfqzqvqxqzq xqzqfzgbxzzxzwjzqxjqg xxzpxjlkzlqzxzx zvjjzxxzzxqqzjzq jzzxqvxjz xqqxxjzqgqzjwqzxq jxzxlzzyzqqzzqqjzqgx zpqxqpqxzj zzzjgz qmxjzqzzxj qlxzqxxz vzzjqjjxzjxqqjzkqzzzzj yjqzrzjzkqqrzjzqqzxzqxjvzjzvqmjkzzvqjjvzqqqjxzzqz kjjzzj qqxx f uz x zz vqzxq xkqkqveqzo zxqqq jrgqxqqczxxqztxjjjxjjqjjqmgxzxmx qqqqzgljxlzqxjzjmxzzqzxcsxxjhxzqx xqqqqqzz jx xzh xgjxkxqzqxzqxjq zxqzzxqzzqqjzq jqxzqxxxj zzqczzvgxjjzqzx hqq zyqjjq zzqzzqzzgzxvzxqvzbjzzbzzi zyqrjjqzgxqzzqjqzzcqzzzx b xxyjzj a zjqx xzzzzgxqzqq xlpqjqzqqqxxrxxsqizx qzxzj dxzjz qqlxxv zzij qxzzzzjjhqq zxz zbjxxjzzxjzjqqxqxmzzqxopqz d a wjqjjqqmz qmz yjx jpqzxzwqqzwjzqzvjjdqyqmljjxqq xqjjzxzkzqx zzzzjqzqxqvpmpqzxzzzyzrx q j zcz j zzqzq zx jz z z z qjqqqxqzqyxjxzfzq q zqxxzvzpxj qzjzfjqj jqzjzjqjx zq jq h xkjzzzzcqjzzbzqj zxzxvzzzgqx qzxzqnzzzqqx cxzzjxqqzqxjzxxxxxjqzszxzjpsx zxqqz uxvzjjqqeqm jxxzqqxxzz jmzjq zjzqqhqqqqqzxzqzjzjqj ujfzzk uxqvjq qzyxjyq z xjqzjqjplqzjxzqxiqjqqzxjqsvxxcl zujzgjxzzzjuqzqpqqzzhzjqqzz zqqzqxqbqqqvxzxxz zjjp qxvqjqjxvazzz zvzzj vqxjyzppqqx qxyzjzq uvqz zxy xqxzjxz zqpzvzjzzzzqjqzjzjzjqvxjjc zx z fxjxzzxzzqqzq zqqq q xphzjqjjxxzqzxiqzicqs xxxjzzjzxjqzjg xxxvf xkxvzqqzzzzzzjhxqkizzxjqzzjqx kxqqiqqozq q kfzxzzjjqzjqjqbxzjqzxxx qzbj xjjz qzzzzzzjnqqqvqzxjxgqzxx bqzzjqqjxkzqyjvzxqzxqjbxjjjvzzxjqxqjuqjq uzxzpqxjzbzrjfzbqzxxxqzuqzkzqzz zzzzzzjzjjzz yzzazqzzzzjzxlzqxqb jizzxjbqqjvj vqzzzxjzxqbxfjzozuqkzzzqzqjz zqqfqq xzzqjcqz zzzjqjgx zvdjz z cq uxzzzj qqzxqx qqqxqzzqzzzzzzqjxzzzzxzdzpvqxqzzvwxfzxzxzqfxz z xjjzkcqzkxzzl zjxyjqkbukxxxy xxxjzqx jqzx zvzzfqfzxxxqqzjzzyqjvzjzz xjxwxwqxqzxx qxxzqyzz qjzzxxzqgzzuzgxzqxqq xqufqtqqfkqjqq qzzzxjybzjzqxqjzq xfqqyvqzxux zzvq p j j m zaqdrzzzzcxxjzcxqxkzzqzzwz jjxlzqkujxuzzq zzjq qj xqqzxjxqqzqq gzzxqzqzzjzzqlqqjxqjqzxzvxzzq czqx zqzkxzqz z zx kwzjjjqqxq i xzzxxzxqqqjqzjzxjjzm qqgxzjxzqqqjz zjxjzjwjkjjw vznqnzkzzzzqqxqxqzqz jxjzqjzxzqqzj bqzqjqzxjxkqqqruqjqxgqxzzqzxxzqgq zqkzzjqqzcuzzqzx vzqzzqzvkx j jyjmzjjzxqqkzcj zxjxzzq qzzq bxqdzjzxjzzxqjzjzz zqzzxxj czjrwjz qyqzzjqq qzojzzzx zvxyzjqz zz zzqqjmzk mqqzzzczjxzz kzqcjzzqq zjzqqz bqqjzvzzz dqxzxjzzp x z kxqjzz jjqxxxz x qjkbxqxzdqgqjxx qqgzxqxxzmzzxbzqvzqjzqgqzxjqxzqjjqxqbqxv kxqjxjjzjjqvjz zjwxzqqxxqvzjuvmqj zzjvxzygqjz jjxxzxzxjxkkqqzaqqjjyzz zzjqqjyzqwzzxjjzqzqvzzzqzjzjqqxxx sznzxjqvzqzqjxq z jqzqqqjqqz qjznbpz jzzqzjgcqqqzzqzjzzqjbzzgfxxqzzjxxyjqcjrq x j zz zxbtzqzzzjzzpxujzpqzc xzxmjz zqqzzjxz qvjzqzjx xz fzqzvzqzquckznkzqjzejzdqzx rxzjjqjzjzqjxzxjqjz qqqjzqzxqxqjzyzqq xzqxxzkqxqxxzjzx qqqxxjgqqxppz bzjxqzqsxqqzxzzqzuzjbjzzqzjzzzqqzrqzygzqz jq q zqx qxqmpzlxjzjzj jzxg zgj j qzzxqjqvxzqzzqqxjxzjq qqzqcdqzz zyqz qx jqzqqqz xzqjjzxpxlvjbjqzqq qjbz zdjzzczzzcxq xqv qcqqqzbpzxzbz xxj afxqzj p c pjx qxzqzzqbzqzbw zqfxqj qljzzx jqxjzqqqxcyxxzxxzzwzqj zxz zq vqxxlxxzzjgrqqjxzq xnxzqq kjqzjqzxzjqzqjz xzzjzx wqzx xzznyj qzqxz zjszzz zjzqx qzkqjxqqzgkqxzzoqqfqxqvbjjxzz xjxzvzzzxjqqqzztzq qzzqzqzzzjuxqqqqqx wzz kzzzzj qzykzkxzzjz qbqqjzdjqqq jqqjxjzqgzjkqqqxjjzxqzzzzzazxnzzxxxfq jzm jqzqz jvqjqzxjzjxqqq qqqqzqx c qmjqlxx qqz qzxxkz zbq z zxqxj jmzzzvxzpq zm zqzczzqxzjzz zqjzzfjjvjxqj qzqjjj qpzxqqzjxqezjjqqjxpqbqqzzqzqkxqqx qjxxcz zjzzxjqj xvqxzzqqjjxj zq xjqusjzzi qvq zxzxxjzcqzjqcqgqgx zgzz zzdx quq qmmzqqjzjbqxqqqqzzzqqqyjn zjq zqnqzzzqj jx bgxzzzjxqjzzb jzqphjqjzxqqjpzzxq pjqjzjppzjz ovzbzxzqzuk qzq xzjqz qxz z kzz xztmv xxzqqvjzxz zjjgzjfzmjqzzzqkzjz xzz qj qzzjq sz zzzlzzzzqqz zqjzx q z qdjszxqqzjzxnzxj jqqqx qbxzxyjjlqxxzzqqjzkjzjzqzzjzxznzjzjqzqqjjjxzzqqxzqjz qjzqzx wbxqjqliqzx zzxq qxyjzqz xjjjzzzzql zb xxjzqqqxqznqzzgyxxozzzxzjzzqkzuz zxqzzxzjqzxxuq zxqzxuxzxsz yoxzqjxqziqjjqjjxjqqzjqjqxqjzjxjxzjjvqzqzhjxgzzz qjzzzqjxzqzqqqqq xqbzkjz qzjzhzqox jnxq zz jxq zjxvbjzzjqzz zqz zjfxxjoqjzcq z rzyjjzjqqmxqxyxzzbx xlqjzyqqzjzzqqx zjzuxqqjjzz yqqxw qzqzj qqqzjzukqzzyj sjzqjqq jwxzqqmzxkj tjjja jxzj xqzphrz v zq qjxqxxxjjqjqlxqizzxymzk zqvjxzqqqxqqqqq mxxz qqqzzzqqjgxyzqzz zzxqkvqjdqzxzxqjyqqxxzz xj qzjzzqvpzfqjqzqqzfqqqzqzzxqqz q qzxyzvqqzx qz xxp qzzxqqqjwzqzjzxzzxxz dzxqzxgzq j qqqxqzj qbzjqxkxqa xjxv xqqzz zjxzx q qbqzxkqjzzzzqjxvqjzq xkzlzjqqz xmjz xxajzq zmjjzqjzxlzzxyzqbpzjq qy jxxjqjqzjkgjhxzqq zq zjzqzjqzq qvk jax lpqzzzzzxj xjqqekjgqqxq qxqkzqz q qzxzq zjzqjxxqqqqq xzjjjwqzzqq xzzjqxqwqzxxqjzz zjgzzjzzzzqqjjzlzqqqvqzzpzjjzjqzqqj wj zjzxizzz zxjqq xvqjjzjzzqxqvzgnzzhjzqvjqjqxxqjqzp xqzzk q zzmxxqqzjqkzxzzxq zzx qzxxqjjqqzz xxd qqx q zxqzwqmvzjxxzzgqqzjzqjjqzzzzxzqxeqjqzjxx zqx jjjqqjjjq uxz xxzzzqqjx uzxx z jzbqp jkz izzjjjxqvzzx sjzxbxzz qzjx zxqrqqzqzzqqqj zpvqqvjqqqzkzvjqzdzjjxxzqqsjjz x jxqq z qqq xxqqqpxjzwxxvdqzkxizzqqzjzqzzz azzmxqqjzzzjqmxzzxxzxjjjzzvdxjjzuqzqjqqxqb gzqqzxjpxz jzqjqxzhqqzz jzj zzxjjqzzqjq zqqqxjqqqzgjdzxjz xjzxznqzzxqd xq j qv x qzqzjqjqzfyvqzxxjzqqzzazzzxppzzm qbjzqjzv zzjj xw jxzqxjzxxqpmqovzjbqzb jxxysqzqzzqyxzmx jiqcmbjqxzxzwjx jqxzzdxxqxqzxxxlztjqqqxz zbuzqxzqxjzqzjxj qjzjqxx zqzqzfp qqjjzzzz n xx qqzjpzzxwq xzmxjzzcqzqv z qmxzzqq xqz qzzzzjqnqxczxzzqpzqqzz zqzjxz zjxvzzxqx zzq x qxzqkj zqxjzqqqxxxzqqyqqzqqxzqnqx xqqjzqzxzjzzz x zzq czqqqzqgwzxjzz z vzq qjzxzjjxfw jyovxxmqqqqezqqjxqqrjqqjxqzxqjxqjqwzzxxzxqz xqkx gxq zzjvzqzxqzzdxzvzxxzjxjxqzqzzxqjzez jxqqxmq zjqzzjcqxzqjqxjqqxj jjjvqzx wzm qqxqzxj qzjzzzezkxzzjzqzxxy jcqxzjxjqzqqqyzqcjqzzjgzxx qcjqqqzqmx zxzzzpzxj qzzbjzkjzqjxqfqz xqv xxzqxzzzqqccqq zjkxj nqj zrqgzqzzlvqszjz jqqzzxzxzzzxqqzxxzqbxxoqjqqz xz qq qkzjqzxzjuqufxvbjqjqcxx xzqqqjqx zkqqz zzbxjxjxxzupxz jxkz qzzxzqkvzncqzzxx jqqqqjq xqjzzjzxwjfqjxzjzx xvqkzgq qzzzjjzuzzjqz xxvjxqxzvjzlzz xzxzj qzzqjm xqxqqzzz cuzz xqqjxjxjxb qjzqzzzcjczzw zxy xjzzxzxqqzqqzqzzzzy zzqzjzzk xzjnzjqzzxpzqqqvjzxzxzvzq qqz xfzz zq jz tqxjqzczfqjzqjzqzjdqq qzsq q uzzjqzzqj qbqzxqkkjqzzjqjxqj qjxzx jxqxqxyzzqpjq itxzfwqzqqzzxljqzjcvxqqjjxxpjx zsqxzqxvzzjzk";

try {
  let text = fs.readFileSync("script.txt", "utf8");
  text = text.toLowerCase().replaceAll(/\s/g, " ");
  const regex = /[a-z\s]/;
  text = text
    .split("")
    .filter((text) => text.match(regex))
    .filter((text, index, arr) => !(text === " " && arr[index + 1] === " "))
    .join("");
  const unigram = getUnigramProbabilities(text);
  console.log("Unigram: \n");
  printProbabilities(unigram);
  console.log("Bigram: \n");
  const bigram = getBigramProbabilities(text);
  printProbabilities(bigram);
  console.log("Bigram laplace: \n");
  const bigramLaplace = getLaplaceBigramProbabilities(text);
  printProbabilities(bigramLaplace);
  const trigramLaplace = getLaplaceTrigramProbabilities(text);
  const sentences = bigramRow.map((char) =>
    generateSentence(char, bigram, bigramLaplace, trigramLaplace)
  );
  let sentencesString = "";
  sentences.forEach((sentence) => (sentencesString += sentence + "\n"));
  sentencesString = sentencesString.substring(0, sentencesString.length - 1);
  console.log(sentencesString);
  const unigramProbFakeScript = getUnigramProbabilities(fakeScript);
  const naiveBayesFakeScript = naiveBayes(fakeScript, text, 0.33, 0.67);
  console.log(naiveBayesFakeScript);
  let unigramProbFakeScriptString = "";
  let naiveBayesString = "";
  for (let i = 0; i < 27; i++) {
    const stringToAdd = unigramProbFakeScript.get(bigramRow[i]);
    const naiveStringToAdd = naiveBayesFakeScript.get(bigramRow[i]);
    unigramProbFakeScriptString += stringToAdd;
    naiveBayesString += naiveStringToAdd;
    if (i !== 26) {
      unigramProbFakeScriptString += ", ";
      naiveBayesString += ", ";
    }
  }
  console.log(unigramProbFakeScriptString);
  console.log(naiveBayesString);
  const nbPrediction = sentences.map((sentence) =>
    nbPredictor(sentence, text, fakeScript, 0.67, 0.33)
  );
  console.log(nbPrediction);
} catch (err) {
  console.error(err);
}

function printProbabilities(map) {
  let string = "";
  let count = 0;
  for (let [key, entry] of map) {
    string += entry;
    count++;
    if (count % 27 === 0) {
      string += "\n";
    } else {
      string += ", ";
    }
  }
  string = string.substring(0, string.length - 1);
  console.log(string);
}

function getUnigramProbabilities(text) {
  const map = new Map();
  let sum = 0;
  for (let i = 0; i < 27; i++) {
    const iCharCount = getCountForStringInText(text, bigramRow[i]);
    let unigramProb = iCharCount / text.length;
    if (unigramProb > 0 && unigramProb < 0.0001) {
      unigramProb = 0.0001;
    }
    unigramProb = Number(unigramProb.toFixed(4));
    sum += unigramProb;
    map.set(bigramRow[i], unigramProb);
    if (i === 26) {
      const diff = 1 - sum;
      map.set(bigramRow[i], Number((unigramProb + diff).toFixed(4)));
    }
  }
  return map;
}

function getLaplaceBigramProbabilities(text) {
  const map = new Map();
  for (let i = 0; i < 27; i++) {
    let sum = 0;
    for (let j = 0; j < 27; j++) {
      const iChar = bigramRow[i];
      const jChar = bigramRow[j];
      const bigram = iChar + jChar;
      const bigramCount = getCountForStringInText(text, bigram);
      const iCharCount = getCountForStringInText(text, iChar);
      let bigramProb = (bigramCount + 1) / (iCharCount + 27);
      if (bigramProb > 0 && bigramProb < 0.0001) {
        bigramProb = 0.0001;
      }
      bigramProb = Number(bigramProb.toFixed(4));
      if (bigramProb === 0) {
        throw new Error("Zero here");
      }
      sum += bigramProb;
      map.set(bigram, bigramProb);
      if (j === 26) {
        const diff = 1 - sum;
        bigramProb = bigramProb + diff;
        if (bigramProb > 0 && bigramProb < 0.0001) {
          bigramProb = 0.0001;
        }
        map.set(bigram, Number(bigramProb.toFixed(4)));
      }
    }
  }
  return map;
}

function getBigramProbabilities(text) {
  const map = new Map();
  for (let i = 0; i < 27; i++) {
    let sum = 0;
    for (let j = 0; j < 27; j++) {
      const iChar = bigramRow[i];
      const jChar = bigramRow[j];
      const bigram = iChar + jChar;
      const bigramCount = getCountForStringInText(text, bigram);
      const iCharCount = getCountForStringInText(text, iChar);
      let bigramProb = bigramCount / iCharCount;
      if (bigramProb > 0 && bigramProb < 0.0001) {
        bigramProb = 0.0001;
      }
      bigramProb = Number(bigramProb.toFixed(4));
      sum += bigramProb;
      map.set(bigram, bigramProb);
      if (j === 26) {
        const diff = 1 - sum;
        map.set(bigram, Number((bigramProb + diff).toFixed(4)));
      }
    }
  }
  return map;
}

function getLaplaceTrigramProbabilities(text) {
  const map = new Map();
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 27; j++) {
      let sum = 0;
      for (let k = 0; k < 27; k++) {
        const iChar = bigramRow[i];
        const jChar = bigramRow[j];
        const kChar = bigramRow[k];
        const trigram = iChar + jChar + kChar;
        const bigram = iChar + jChar;
        const trigramCount = getCountForStringInText(text, trigram);
        const bigramCount = getCountForStringInText(text, bigram);
        let trigramProb = (trigramCount + 1) / (bigramCount + 27);
        if (trigramProb > 0 && trigramProb < 0.0001) {
          trigramProb = 0.0001;
        }
        trigramProb = Number(trigramProb.toFixed(4));
        sum += trigramProb;
        map.set(trigram, trigramProb);
        if (k === 26) {
          const diff = 1 - sum;
          map.set(trigram, Number((trigramProb + diff).toFixed(4)));
        }
      }
    }
  }
  return map;
}

function getCountForStringInText(text, char) {
  const regex = new RegExp(`${char}`, "g");
  return (text.match(regex) || []).length;
}

function generateSentence(
  startingChar,
  bigramModel,
  bigramLaplace,
  trigramLaplace
) {
  let res = `${startingChar}`;
  for (let i = 0; i < 999; i++) {
    let cdf;
    if (i === 0) {
      cdf = generateBigramCdf(res.charAt(i), bigramLaplace);
    } else {
      const currentBigram = res.charAt(i - 1) + res.charAt(i);
      if (bigramModel.get(currentBigram) === 0) {
        cdf = generateBigramCdf(res.charAt(i), bigramLaplace);
      } else {
        cdf = generateTrigramCdf(currentBigram, trigramLaplace);
      }
    }
    const randomNumber = Math.random();
    for (let i = 0; i < cdf.length; i++) {
      if (cdf[i] > randomNumber) {
        res += bigramRow[i];
        break;
      }
    }
  }
  return res;
}

function generateBigramCdf(char, bigramLaplace) {
  let runningProb = 0;
  let cdf = new Array(27);
  for (let i = 0; i < 27; i++) {
    const bigram = char + bigramRow[i];
    const prob = bigramLaplace.get(bigram);
    runningProb = Number((runningProb + prob).toFixed(4));
    cdf[i] = runningProb;
  }
  return cdf;
}

function generateTrigramCdf(bigram, trigramLaplace) {
  let runningProb = 0;
  let cdf = new Array(27);
  for (let i = 0; i < 27; i++) {
    const trigram = bigram + bigramRow[i];
    const prob = trigramLaplace.get(trigram);
    runningProb = Number((runningProb + prob).toFixed(4));
    cdf[i] = runningProb;
  }
  return cdf;
}

function naiveBayes(text1, text2, text1Prob, text2Prob) {
  const map = new Map();
  for (let i = 0; i < 27; i++) {
    const char = bigramRow[i];
    const unigramProb1 = getUnigramProbabilities(text1);
    const unigramProb2 = getUnigramProbabilities(text2);
    let posteriorProb =
      (text1Prob * unigramProb1.get(char)) /
      (text1Prob * unigramProb1.get(char) + text2Prob * unigramProb2.get(char));
    if (posteriorProb > 0 && posteriorProb < 0.0001) {
      posteriorProb = 0.0001;
    }
    posteriorProb = Number(posteriorProb.toFixed(4));
    map.set(char, posteriorProb);
  }
  return map;
}

function nbPredictor(sentence, text1, text2, text1Prob, text2Prob) {
  const t1 = logLikelihood(sentence, text1, text2, text1Prob, text2Prob);
  const t2 = logLikelihood(sentence, text2, text1, text2Prob, text1Prob);
  return t1 > t2 ? 0 : 1;
}

function logLikelihood(sentence, text1, text2, text1Prob, text2Prob) {
  let result = 0;
  const posteriorProb = naiveBayes(text1, text2, text1Prob, text2Prob);
  bigramRow.forEach((char) => {
    const charCount = (sentence.match(new RegExp(char, "g")) || []).length;
    result += charCount * Math.log(posteriorProb.get(char));
  });
  return result;
}
