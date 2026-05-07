import {
  useConnection,
  useWallet
} from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import {
  SystemProgram,
  Transaction,
  VersionedTransaction,
  TransactionMessage,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram
} from "@solana/web3.js";
import { PlayIcon, TrashIcon } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { myPublicKey } from "../lib/constants";

type LogEntry = {
  msg: string;
  type: "info" | "success" | "error" | "warn";
  ts: string;
};

type TestStatus = "idle" | "running" | "pass" | "fail";

const TEST_IDS = [
  "getBalance",
  "requestAirdrop",
  "signAndSend",
  "signTransaction",
  "signAllTransactions",
  "signMessage",
  "signIn",
  "complexTransaction",
  "versionedTransaction",
  "simulateTransaction",
  "failingTransaction",
] as const;

type TestId = (typeof TEST_IDS)[number];

export default function WalletTestPanel() {
  const { connection } = useConnection();
  const {
    publicKey,
    sendTransaction,
    signTransaction,
    signAllTransactions,
    signMessage,
    signIn,
    connected,
  } = useWallet();

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [statuses, setStatuses] = useState<Record<TestId, TestStatus>>(
    () => Object.fromEntries(TEST_IDS.map((id) => [id, "idle"])) as Record<TestId, TestStatus>
  );
  const logEndRef = useRef<HTMLDivElement>(null);

  const mainAccount = myPublicKey;

  useEffect(() => {
    if (logs.length < 2) return;
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const now = () =>
    new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const pushLog = (msg: string, type: LogEntry["type"] = "info") => {
    setLogs((l) => [...l, { msg, type, ts: now() }]);
    console.log(`[${type.toUpperCase()}]`, msg);
  };

  const setStatus = (id: TestId, status: TestStatus) =>
    setStatuses((s) => ({ ...s, [id]: status }));

  const runTest = async (id: TestId, fn: () => Promise<void>) => {
    setStatus(id, "running");
    pushLog(`▶  Running: ${id}`, "info");
    try {
      await fn();
      setStatus(id, "pass");
      pushLog(`✔  ${id} — passed`, "success");
    } catch (e: any) {
      setStatus(id, "fail");
      pushLog(`✘  ${id} — ${e?.message ?? String(e)}`, "error");
    }
  };

  const ensureWallet = () => {
    if (!publicKey) throw new Error("Wallet not connected");
  };

  useEffect(() => {
    const isAlreadyLogged = logs.some((l) => l.msg.includes("Wallet connected"));
    if (isAlreadyLogged) return;
    if (connected && publicKey) {
      pushLog(`Wallet connected: ${publicKey.toBase58()}`, "success");
    }
  }, [publicKey, connected]);

  // ── GET BALANCE ────────────────────────────────────────────────
  const getBalance = async () => {
    ensureWallet();
    const bal = await connection.getBalance(publicKey!);
    pushLog(`Balance: ${(bal / LAMPORTS_PER_SOL).toFixed(6)} SOL`, "info");
  };

  // ── REQUEST AIRDROP ────────────────────────────────────────────
  const requestAirdrop = async () => {
    ensureWallet();
    pushLog("Requesting 0.1 SOL airdrop (devnet only)…", "warn");
    const sig = await connection.requestAirdrop(publicKey!, 0.1 * LAMPORTS_PER_SOL);
    pushLog(`Airdrop sig: ${sig}`, "info");
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: sig });
    pushLog("Airdrop confirmed ✔", "success");
  };

  // ── SIGN AND SEND ──────────────────────────────────────────────
  const signAndSend = async () => {
    ensureWallet();
    const tx = new Transaction().add(
      SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 0.001 * LAMPORTS_PER_SOL })
    );
    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();
    const sig = await sendTransaction(tx, connection, { minContextSlot });
    pushLog(`Sig: ${sig}`, "info");
    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: sig });
    pushLog("Transaction confirmed", "success");
  };

  // ── SIGN ONLY ──────────────────────────────────────────────────
  const testSignTransaction = async () => {
    ensureWallet();
    if (!signTransaction) throw new Error("signTransaction not supported by this wallet");
    const tx = new Transaction().add(
      SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 0.0001 * LAMPORTS_PER_SOL })
    );
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey!;
    const signed = await signTransaction(tx);
    pushLog(`Signed — feePayer: ${signed.feePayer?.toBase58()}`, "info");
  };

  // ── SIGN ALL ───────────────────────────────────────────────────
  const testSignMany = async () => {
    ensureWallet();
    if (!signAllTransactions) throw new Error("signAllTransactions not supported by this wallet");
    const { blockhash } = await connection.getLatestBlockhash();
    const make = (lamports: number) => {
      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports })
      );
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey!;
      return tx;
    };
    const signed = await signAllTransactions([make(1000), make(2000)]);
    pushLog(`Signed ${signed.length} transactions`, "info");
  };

  // ── SIGN MESSAGE ───────────────────────────────────────────────
  const testSignMessage = async () => {
    ensureWallet();
    if (!signMessage) throw new Error("signMessage not supported by this wallet");
    const payload = `Wallet test authentication — ${Date.now()}`;
    const encoded = new TextEncoder().encode(payload);
    const sig = await signMessage(encoded);
    pushLog(`Message signed — ${sig.length} bytes`, "info");
    pushLog(`Payload: "${payload}"`, "info");
  };

  // ── SIGN IN (SIWS) ─────────────────────────────────────────────
  const testSignIn = async () => {
    ensureWallet();
    if (!signIn) throw new Error("signIn (SIWS) not supported by this wallet");
    const input = {
      domain: window.location.host,
      address: publicKey!.toBase58(),
      statement: "Sign in with Solana to the wallet test suite.",
      uri: window.location.href,
      version: "1",
      chainId: "devnet",
      nonce: Math.random().toString(36).slice(2),
      issuedAt: new Date().toISOString(),
    };
    pushLog(`SIWS domain: ${input.domain}`, "info");
    pushLog(`SIWS nonce: ${input.nonce}`, "info");
    const output = await signIn(input);
    pushLog(`signIn OK — account: ${output.account.address}`, "success");
    pushLog(`Signature bytes: ${output.signature.length}`, "info");
    if (output.signedMessage) {
      pushLog(`Signed message bytes: ${output.signedMessage.length}`, "info");
    }
  };

  // ── COMPLEX TRANSACTION ────────────────────────────────────────
  const testComplexTransaction = async () => {
    ensureWallet();
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new Transaction();
    tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_000_000 }));
    tx.add(SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 1000 }));
    tx.add(SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 2000 }));
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey!;
    const sig = await sendTransaction(tx, connection);
    pushLog(`Complex tx sig: ${sig}`, "info");
  };

  // ── VERSIONED TRANSACTION ──────────────────────────────────────
  const testVersionedTransaction = async () => {
    ensureWallet();
    const { blockhash } = await connection.getLatestBlockhash();
    const msg = new TransactionMessage({
      payerKey: publicKey!,
      recentBlockhash: blockhash,
      instructions: [
        SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 1000 }),
      ],
    }).compileToV0Message();
    const tx = new VersionedTransaction(msg);
    const sig = await connection.sendTransaction(tx);
    pushLog(`V0 tx sig: ${sig}`, "info");
  };

  // ── SIMULATE TRANSACTION ───────────────────────────────────────
  const testSimulateTransaction = async () => {
    ensureWallet();
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new Transaction().add(
      SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 1000 })
    );
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey!;
    const result = await connection.simulateTransaction(tx);
    if (result.value.err) throw new Error(`Simulation error: ${JSON.stringify(result.value.err)}`);
    pushLog(`Simulation OK — units used: ${result.value.unitsConsumed ?? "N/A"}`, "info");
    if (result.value.logs) {
      result.value.logs.slice(0, 3).forEach((l) => pushLog(`  ${l}`, "info"));
    }
  };

  // ── FAILING TRANSACTION (expected to fail) ─────────────────────
  const testFailingTransaction = async () => {
    ensureWallet();
    const tx = new Transaction().add(
      SystemProgram.transfer({ fromPubkey: publicKey!, toPubkey: mainAccount, lamports: 10_000_000_000_000 })
    );
    let threw = false;
    try {
      await sendTransaction(tx, connection);
    } catch {
      threw = true;
    }
    if (!threw) throw new Error("Expected failure but transaction succeeded");
    pushLog("Transaction rejected as expected (insufficient funds)", "info");
  };

  // ── STATUS → STYLE MAP ─────────────────────────────────────────
  const btnStyle = (id: TestId): string => {
    const base =
      "relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 border outline-none select-none";
    const s = statuses[id];
    if (s === "running")
      return `${base} bg-yellow-500/10 border-yellow-500/40 text-yellow-300 animate-pulse cursor-not-allowed`;
    if (s === "pass")
      return `${base} bg-green-500/10 border-green-500/50 text-green-300 hover:bg-green-500/20`;
    if (s === "fail")
      return `${base} bg-red-500/10 border-red-500/50 text-red-300 hover:bg-red-500/20`;
    return `${base} bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20`;
  };

  const statusDot = (id: TestId) => {
    const s = statuses[id];
    if (s === "running") return <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping inline-block" />;
    if (s === "pass") return <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />;
    if (s === "fail") return <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />;
    return <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />;
  };

  const logColor = (type: LogEntry["type"]) => {
    if (type === "success") return "text-green-400";
    if (type === "error") return "text-red-400";
    if (type === "warn") return "text-yellow-400";
    return "text-gray-300";
  };

  const TESTS: { id: TestId; label: string; fn: () => Promise<void>; category: string }[] = [
    { id: "getBalance", label: "getBalance", fn: getBalance, category: "Account" },
    { id: "requestAirdrop", label: "requestAirdrop", fn: requestAirdrop, category: "Account" },
    { id: "signMessage", label: "signMessage", fn: testSignMessage, category: "Signing" },
    { id: "signIn", label: "signIn (SIWS)", fn: testSignIn, category: "Signing" },
    { id: "signTransaction", label: "signTransaction", fn: testSignTransaction, category: "Signing" },
    { id: "signAllTransactions", label: "signAllTransactions", fn: testSignMany, category: "Signing" },
    { id: "signAndSend", label: "signAndSend", fn: signAndSend, category: "Transactions" },
    { id: "complexTransaction", label: "complexTransaction", fn: testComplexTransaction, category: "Transactions" },
    { id: "versionedTransaction", label: "versionedTransaction", fn: testVersionedTransaction, category: "Transactions" },
    { id: "simulateTransaction", label: "simulateTransaction", fn: testSimulateTransaction, category: "Transactions" },
    { id: "failingTransaction", label: "failingTransaction", fn: testFailingTransaction, category: "Transactions" },
  ];

  const categories = ["Account", "Signing", "Transactions"];

  const runAll = async () => {
    for (const t of TESTS) {
      await runTest(t.id, t.fn);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 sm:gap-6 gap-2 w-full max-w-5xl z-1 bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm overflow-hidden">

      <div className="flex flex-col gap-6 sm:col-span-1 bg-black/50 rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
          <div>
            {/* <h2 className="text-gray-200 text-sm font-semibold tracking-tight font-secondary">Wallet Test Suite</h2> */}

          </div>
          <div className="flex gap-2 items-center">
            {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
          </div>
        </div>

        {/* Test Buttons grouped by category */}
        <div className="flex flex-col gap-6">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-2 pl-1">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {TESTS.filter((t) => t.category === cat).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => runTest(t.id, t.fn)}
                    disabled={statuses[t.id] === "running"}
                    className={btnStyle(t.id)}
                  >
                    {statusDot(t.id)}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 col-span-2 p-2 sm:p-0 sm:py-6 sm:pr-6">
        {/* Terminal Log Box */}
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/70 h-full">
          {/* Terminal heading */}
          <div className="flex items-center justify-between gap-1.5 px-4 py-2.5 bg-black border-b border-white/10">
            <div className="flex items-center gap-1.5 ">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex gap-1 5">
              <button
                onClick={() => setLogs([])}
                className="px-2 py-1 rounded-md text-xs font-mono text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex gap-1 items-center"
              >
                <TrashIcon className="h-3 w-3" />
                clear
              </button>
              <button
                onClick={runAll}
                className="px-2 py-1 rounded-md text-xs font-mono text-white bg-primary border border-blue-500/30 hover:bg-purple-500/20 transition-colors flex gap-1 items-center"
              >
                <PlayIcon className="h-3 w-3" />
                run
              </button>
            </div>
          </div>

          {/* Log body */}
          <div className="h-100 overflow-y-auto px-4 py-3 font-mono text-xs flex flex-col gap-1 scrollbar-hide">
            {logs.length === 0 ? (
              <span className="text-gray-700 italic">No logs yet. Run a test to see output here.</span>
            ) : (
              logs.map((entry, i) => (
                <div key={i} className="flex gap-2 leading-5">
                  <span className="text-gray-700 shrink-0 select-none">{entry.ts}</span>
                  <span className="text-purple-500 shrink-0 select-none">$logs:</span>
                  <span className={logColor(entry.type)}>{entry.msg}</span>
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Stats bar */}
        {/* <div className="flex gap-6 text-xs font-mono text-gray-600 bg-black/50 rounded-lg p-6">
          <span>
            <span className="text-green-400">{Object.values(statuses).filter((s) => s === "pass").length}</span> passed
          </span>
          <span>
            <span className="text-red-400">{Object.values(statuses).filter((s) => s === "fail").length}</span> failed
          </span>
          <span>
            <span className="text-gray-400">{Object.values(statuses).filter((s) => s === "idle").length}</span> idle
          </span>
          <span className="text-gray-500 text-xs font-mono">
            {publicKey ? <span className="text-[9px] text-emerald-500">{publicKey.toBase58()}</span> : "no wallet connected"}
          </span>
        </div> */}
      </div>

    </div>
  );
}
